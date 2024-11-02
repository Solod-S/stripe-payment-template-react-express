const stripe = require("../services/stripe");

const createCustomer = async (req, res) => {
  try {
    const { email, name } = req.body;
    const customer = await stripe.customers.create({ email, name });
    return res.json({ success: true, data: customer });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createCustomer;
