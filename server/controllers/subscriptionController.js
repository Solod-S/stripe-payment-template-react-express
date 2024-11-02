const stripe = require("../services/stripe");

const subscriptionController = async (req, res) => {
  try {
    const { email, price, sites, period } = req.body;

    // Создайте клиента Stripe
    const customer = await stripe.customers.create({ email });

    // Определите ID ценового плана на основе периодов
    let priceId;
    if (period === "month") {
      priceId = "your_monthly_price_id"; //  ID месячной цены (Products в stripe dashboard)
    } else if (period === "year") {
      priceId = "your_yearly_price_id"; //  ID годовой цены (Products в stripe dashboard)
    }

    // Создайте подписку
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      expand: ["latest_invoice.payment_intent"], // Расширьте, чтобы получить платежный интенцион
    });

    return res.json({ success: true, data: subscription });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = subscriptionController;
