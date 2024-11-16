const stripe = require("../services/stripe");

const getAllPrices = async (req, res, next) => {
  const { email } = req.body;

  try {
    const result = { currentSubscription: null };
    // Если email присутствует, ищем клиентов с таким email через Stripe API
    const customersObf = await stripe.customers.list({ email });
    const customers = customersObf.data;
    // console.log(`customers`, customers);
    // Получаем все активные цены для указанного продукта
    const prices = await stripe.prices.list({
      product: process.env.STRIPE_PRODUCT_ID,
      active: true,
    });

    result.prices = prices.data;
    console.log(`email`, email);
    if (email) {
      for (const customer of customers) {
        // Получаем список активных подписок клиента
        const subscr = await stripe.subscriptions.list({
          customer: customer.id,
          status: "active",
        });
        console.log(`subscr`, process.env.STRIPE_PRODUCT_ID);
        // Ищем подписку на продукт с указанным идентификатором продукта (на платформе пользователь с таким имейлом может купить разные продукты)
        const subscriptionForProduct = subscr.data.find(
          subscription =>
            subscription.plan.product === process.env.STRIPE_PRODUCT_ID
        );

        // Если найдена подписка на данный продукт, добавляем её в результат и прекращаем поиск
        if (subscriptionForProduct) {
          result.currentSubscription = subscriptionForProduct;
          break;
        }
      }
    }

    res.json(result);
  } catch (error) {
    console.error("Error while getting stripe's prices:", error);
    res.status(500).send({ error: "Error while getting stripe's prices" });
  }
};

module.exports = getAllPrices;
