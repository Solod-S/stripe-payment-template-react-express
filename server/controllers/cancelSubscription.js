const stripe = require("../services/stripe");
const moment = require("moment");

const cancelSubscription = async (req, res) => {
  const { idToken, userEmail } = req.body;

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
      return res.status(404).json({ error: "Customer not found" });
    }

    const customer = customers.data[0];

    // 2. Найти активную подписку клиента
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
    });

    if (!subscriptions.data.length) {
      return res.status(404).json({
        error: "No active subscription found to cancel",
      });
    }
    // 3. выбираем подписку на наш продукт
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

    // 4. Отменить подписку
    const canceledSubscription = await stripe.subscriptions.cancel(
      subscription.id,
      {
        prorate: false, // Подписка будет отменена в конце оплаченного периода (если true то Stripe произведет возврат за оставшийся неиспользованный период подписки.)
      }
    );
    // console.log(`canceledSubscription`, canceledSubscription);
    const endSubscriptionPeriod = canceledSubscription.current_period_end;
    const endSubscriptionPeriodHumanEndDate = moment
      .unix(endSubscriptionPeriod)
      .format("YYYY-MM-DD HH:mm:ss");
    console.log(
      `endSubscriptionPeriodHumanEndDate`,
      endSubscriptionPeriodHumanEndDate
    );

    res.json({
      status: "success",
      message: "Subscription canceled successfully",
      subscriptionId: canceledSubscription.id,
      status: canceledSubscription.status,
      endSubscriptionPeriodHumanEndDate,
    });
  } catch (error) {
    console.error(`Error canceling subscription: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = cancelSubscription;
