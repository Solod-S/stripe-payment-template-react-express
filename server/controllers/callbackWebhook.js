const stripe = require("../services/stripe");

const callbackWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    console.log(
      "Stripe webhook Bad Request: correct signature not found in the header"
    );
    return res
      .status(400)
      .send("Webhook Bad Request: correct signature not found in the header");
  }

  let event;
  try {
    if (!req.body) {
      console.log("No raw body present in request");
      return res.status(400).send("No webhook payload was provided.");
    }

    // Validating a Webhook Using a Raw Body (Buffer)
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(`Stripe Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("Stripe event type:", event.type);

  // Handle different types of events
  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object;
    console.log("Payment succeeded for invoice:", invoice.id);

    const subscriptionData = invoice.lines.data[invoice.lines.data.length - 1];
    // Additional request to get customer data (e.g. email)
    const customer = await stripe.customers.retrieve(invoice.customer);

    const data = {
      type: "stripe",
      payment_subscription_id: subscriptionData?.subscription, // ID подписки
      payment_subscription_item: subscriptionData?.subscription_item, // ID элемента подписки
      payment_price_id: subscriptionData?.price?.id, // ID цены
      payment_plan_id: subscriptionData?.plan?.id, // ID плана
      payment_product_id: subscriptionData?.plan?.product, // ID продукта
      payment_description: subscriptionData?.description, // Описание подписки
      payment_nickname: subscriptionData?.plan?.nickname, // Название плана
      payment_amount: subscriptionData?.plan?.amount / 100, // Цена подписки
      payment_currency: subscriptionData?.currency, // Валюта подписки
      payment_period_start: subscriptionData?.period?.start, // Начало периода подписки
      payment_period_end: subscriptionData?.period?.end, // Конец периода подписки
      payment_invoice_id: invoice?.id, // ID инвойса
      payment_hosted_invoice_url: invoice?.hosted_invoice_url, // Url статуса оплаты
      payment_invoice_pdf: invoice?.invoice_pdf, // Url для скачивания квитанции
      payment_status: invoice?.status, // Статус инвойса
      payment_customer_id: invoice?.customer, // ID клиента
      payment_customer_email: customer?.email, // Email клиента
      payment_intent: invoice?.payment_intent, // ID платежа (если доступно)
      payment_created_at: invoice?.created, // Дата создания инвойса
    };

    console.log("Payment succeeded for subscription:", data);

    const endSubscriptionPeriod = subscriptionData?.period?.end;
    const endSubscriptionPeriodHumanEndDate = moment
      .unix(endSubscriptionPeriod)
      .format("YYYY-MM-DD HH:mm:ss");
    console.log(
      `endSubscriptionPeriodHumanEndDate`,
      endSubscriptionPeriodHumanEndDate
    );
  }

  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object;
    console.log("Payment failed for invoice:", invoice.id);
  }

  res.json({ received: true });
};

module.exports = callbackWebhook;
