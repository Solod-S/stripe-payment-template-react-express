const stripe = require("../services/stripe");

const getAllCharges = async (req, res) => {
  try {
    const charges = await stripe.charges.list({
      limit: 100,
    });

    return res.json({
      success: true,
      data: charges.data,
    });
  } catch (error) {
    console.error("Error fetching charges:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = getAllCharges;
