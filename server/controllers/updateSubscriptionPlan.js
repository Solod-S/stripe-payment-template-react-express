const stripe = require("../services/stripe");

const updateSubscriptionPlan = async (req, res) => {
  const { newPriceId, userEmail } = req.body;

  try {
    if (!userEmail) {
      return res.status(403).json({ message: "Unauthorized request" });
    }

    // 1. Найти клиента по email
    const customers = await stripe.customers.list({
      email: userEmail,
      limit: 1,
    });

    if (!customers.data.length) {
      return res.status(404).send({ error: "Customer not found" });
    }

    const customer = customers.data[0];

    // 2. Найти подписку клиента на продукт
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
    });

    // Найти подписку с нужным продуктом
    const subscription = subscriptions.data.find(sub =>
      sub.items.data.some(
        item => item.price.product === process.env.STRIPE_PRODUCT_ID
      )
    );

    if (!subscription) {
      return res.status(404).send({
        error: "Active subscription not found for the specified product",
      });
    }

    // 3. Получить текущий план подписки
    const currentPriceId = subscription.items.data[0].price.id;

    // 4. Определить `proration_behavior` в зависимости от того, дороже ли новый план
    let prorationBehavior = "none"; // По умолчанию - без возврата (если план дешевле)

    // Получаем информацию о новом и текущем планах
    const currentPrice = await stripe.prices.retrieve(currentPriceId);
    const newPrice = await stripe.prices.retrieve(newPriceId);

    if (newPrice.unit_amount > currentPrice.unit_amount) {
      // Если новый план дороже, выставляем proration_behavior для доплаты
      prorationBehavior = "always_invoice";
    }
    console.log(`prorationBehavior`, prorationBehavior);
    // 5. Обновить план подписки с новым `priceId`
    const updatedSubscription = await stripe.subscriptions.update(
      subscription.id,
      {
        items: [
          {
            id: subscription.items.data[0].id, // ID текущего элемента подписки
            price: newPriceId,
          },
        ],
        payment_behavior: "pending_if_incomplete",
        proration_behavior: prorationBehavior,
      }
    );

    res.json({
      status: "success",
      updatedSubscription: updatedSubscription?.items?.data[0],
      subscriptionId: updatedSubscription.id,
      status: updatedSubscription.status,
    });
  } catch (error) {
    console.error(`Error updating subscription plan: ${error.message}`);
    res.status(500).send({ error: error.message });
  }
};

module.exports = updateSubscriptionPlan;

// 1) Для более дорогого плана — используйте proration_behavior: "always_invoice" для создания дополнительного счёта (доплаты).
// 2) Для более дешёвого плана — установите proration_behavior: "none", чтобы изменение произошло в конце текущего оплаченного периода, без возврата средств.
