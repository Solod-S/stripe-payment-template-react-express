const stripe = require("../services/stripe");

const processSubscription = async (req, res) => {
  const { priceId, userEmail } = req.body;

  try {
    if (!userEmail) {
      return res.status(403).json({ message: "Unauthorized request" });
    }
    //1) Создаем сессию оплаты
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // ID of the selected price list
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      mode: "subscription", // Subscription payment
      success_url: "https://newsai.siliconbeez.com/app/dashboards",
      cancel_url: "https://newsai.siliconbeez.com/app/dashboards",
    });
    //2) Возвращаем id сессии на клиент
    res.json({ sessionId: session.id }); // Send session Id to the front
  } catch (error) {
    console.log(`Error in stripe checkout session: ${error.message}`);
    res.status(500).send({ error: error.message });
  }
};

module.exports = processSubscription;
