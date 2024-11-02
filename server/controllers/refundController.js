const stripe = require("../services/stripe");

const refundController = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
    });
    return res.json({ success: true, data: refund });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = refundController;
