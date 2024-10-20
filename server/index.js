require("dotenv").config();
const cors = require("cors");
const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);

const app = express();

app.use(cors());
app.use(express.json());

const stripeController = async (req, res) => {
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
        unit_amount: price * 100, // Stripe работает с ценами в центах
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

const callbackWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_SIGNING_SECRET
    );
  } catch (err) {
    console.log(`⚠️ Webhook signature verification failed.`, err.message);
    return res.sendStatus(400);
  }
  console.log(`event`, event);
  console.log(`event.data`, event.data);
  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log(`session`, session);

      console.log("Payment was successful for session:", session.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("Received");
};

app.post("/api/payment/process-payment/stripe", stripeController);

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  callbackWebhook
);

app.listen(5555, () => {
  console.log("Server is running on port 5555");
});
