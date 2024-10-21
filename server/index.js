require("dotenv").config();
const cors = require("cors");
const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);
const { swaggerUi, swaggerDocs } = require("./swagger"); // Импорт Swagger

const app = express();

app.use(cors());
app.use(express.json());

// Подключение Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 1) Create Payment
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

/**
 * @swagger
 * /api/payment/process-payment:
 *   post:
 *     summary: Create a payment session
 *     description: Creates a Stripe payment session.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 example: 5000
 *               sites:
 *                 type: number
 *                 example: 3
 *               period:
 *                 type: string
 *                 example: "monthly"
 *     responses:
 *       200:
 *         description: Payment session created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "session_id"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Internal server error
 */

app.post("/api/payment/process-payment", processPayment);

// 2) Payment Callback Handler
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

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log("Payment was successful for session:", session.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("Received");
};

/**
 * @swagger
 * /api/payment/webhook:
 *   post:
 *     summary: Handle payment webhook
 *     description: Stripe webhook for processing payment events.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook received
 *       400:
 *         description: Signature verification failed
 */

app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  callbackWebhook
);

// 3) Get All Payments
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

/**
 * @swagger
 * /api/payment/payments:
 *   get:
 *     summary: Get all payments
 *     description: Retrieves a list of all payment intents.
 *     responses:
 *       200:
 *         description: List of payment intents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "pi_123456789"
 *                       amount:
 *                         type: integer
 *                         example: 5000
 *                       currency:
 *                         type: string
 *                         example: "usd"
 *       500:
 *         description: Internal server error
 */

app.get("/api/payment/payments", getAllPayments);

// 4) Get All Completed Payments
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

/**
 * @swagger
 * /api/payment/charges:
 *   get:
 *     summary: Get all completed payments
 *     description: Retrieves a list of all completed charges.
 *     responses:
 *       200:
 *         description: List of charges
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "ch_123456789"
 *                       amount:
 *                         type: integer
 *                         example: 5000
 *                       currency:
 *                         type: string
 *                         example: "usd"
 *       500:
 *         description: Internal server error
 */

app.get("/api/payment/charges", getAllCharges);

// 5) Refund
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

/**
 * @swagger
 * /api/payment/refund:
 *   post:
 *     summary: Refund a payment
 *     description: Creates a refund for a specified payment intent.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentIntentId:
 *                 type: string
 *                 example: "pi_123456789"
 *     responses:
 *       200:
 *         description: Refund created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "re_123456789"
 *       500:
 *         description: Internal server error
 */

app.post("/api/payment/refund", refundController);

// 6) Create Customer
const createCustomer = async (req, res) => {
  try {
    const { email, name } = req.body;
    const customer = await stripe.customers.create({ email, name });
    return res.json({ success: true, data: customer });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a customer
 *     description: Creates a new customer in Stripe.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "customer@example.com"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       200:
 *         description: Customer created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "cus_123456789"
 *       500:
 *         description: Internal server error
 */

app.post("/api/customers", createCustomer);

// 7) Create Subscription
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

/**
 * @swagger
 * /api/payment/subscription:
 *   post:
 *     summary: Create a subscription
 *     description: Creates a subscription for a customer. Ensure that the customer and price IDs are valid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: "cus_123456789"
 *                 description: The ID of the customer for whom the subscription is created.
 *               priceId:
 *                 type: string
 *                 example: "price_123456789"
 *                 description: The ID of the price plan for the subscription.
 *     responses:
 *       200:
 *         description: Subscription successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "sub_123456789"
 *                       description: The ID of the created subscription.
 *                     status:
 *                       type: string
 *                       example: "active"
 *                       description: The status of the subscription.
 *       400:
 *         description: Bad Request - Invalid customerId or priceId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid customer ID or price ID."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error."
 */

app.post("/api/payment/subscription", subscriptionController);

// 8) Get Payment Status
const getPaymentStatus = async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return res.json({ success: true, data: paymentIntent });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /api/payment/status/{paymentIntentId}:
 *   get:
 *     summary: Get payment status
 *     description: Retrieves the status of a payment intent.
 *     parameters:
 *       - name: paymentIntentId
 *         in: path
 *         required: true
 *         description: The ID of the payment intent
 *         schema:
 *           type: string
 *           example: "pi_123456789"
 *     responses:
 *       200:
 *         description: Payment intent status retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "pi_123456789"
 *                     status:
 *                       type: string
 *                       example: "succeeded"
 *       500:
 *         description: Internal server error
 */

app.get("/api/payment/status/:paymentIntentId", getPaymentStatus);

app.listen(5555, () => {
  console.log("Server is running on port 5555");
  console.log("http://localhost:5555/api-docs/");
  console.log("Test card 1: ", "4111 1111 1111 1111");
  console.log("Test card 2: ", "4242 4242 4242 4242");
});
