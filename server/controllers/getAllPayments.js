const stripe = require("../services/stripe");

const getAllPayments = async (req, res) => {
  try {
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100,
    });

    return res.json({
      success: true,
      data: paymentIntents.data,
    });
  } catch (error) {
    console.error("Error fetching payments:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = getAllPayments;
