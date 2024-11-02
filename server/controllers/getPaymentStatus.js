const stripe = require("../services/stripe");

const getPaymentStatus = async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return res.json({ success: true, data: paymentIntent });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getPaymentStatus;
