const stripe = require("../services/stripe");

const processPayment = async (req, res) => {
  try {
    console.log(`req.body`, req.body);
    const { price, sites, period } = req.body;

    const productName = `Test - ${sites} sites for ${period} period`;

    const lineItem = {
      price_data: {
        currency: "usd",
        product_data: {
          name: productName,
        },
        unit_amount: price * 100,
      },
      quantity: 1,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [lineItem],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/error",
    });

    return res.json({ id: session.id, success: true });
  } catch (error) {
    console.error("Error creating session:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = processPayment;
