const stripe = require("../services/stripe");
const moment = require("moment");

const changePaymentMethod = async (req, res) => {
  const { userEmail } = req.body;

  try {
    if (!userEmail) {
      return res.status(403).json({ message: "Unauthorized request" });
    }

    // Находим клиента в Stripe по email
    const customers = await stripe.customers.list({
      email: userEmail,
      limit: 1,
    });

    if (!customers.data.length) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const customer = customers.data[0];

    // Создаём сессию Customer Portal
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      // return_url: "https://yourwebsite.com/account", // URL для возврата после изменения карты
    });

    // Возвращаем ссылку на Customer Portal
    res.json({
      url: session.url,
    });
  } catch (error) {
    console.error(`Error creating Customer Portal session: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = changePaymentMethod;
