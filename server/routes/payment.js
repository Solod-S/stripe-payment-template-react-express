const express = require("express");
const paymentRouter = require("express").Router();

const {
  getAllPrices,
  processPayment,
  processSubscription,
  updateSubscriptionPlan,
  cancelSubscription,
  callbackWebhook,
  getAllPayments,
  getAllCharges,
  refundController,
  createCustomer,
  subscriptionController,
  getPaymentStatus,
} = require("../controllers/");

// Get All Prices
paymentRouter.post(
  "/get-all-prices",
  express.raw({ type: "application/json" }),
  getAllPrices
);

// Create Payment
paymentRouter.post(
  "/process-subscription",
  express.json(),
  processSubscription
);

// Update Subscription Plan
paymentRouter.post(
  "/update-subscription-plan",
  express.json(),
  updateSubscriptionPlan
);

// Cancel Subscription Plan
paymentRouter.post(
  "/cancel-subscription-plan",
  express.json(),
  cancelSubscription
);

// Create Payment
paymentRouter.post("/process-payment", express.json(), processPayment);

// Payment Callback Handler
paymentRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  callbackWebhook
);

// Get All Payments
paymentRouter.get("/payments", express.json(), getAllPayments);

// Get All Completed Payments
paymentRouter.get("/charges", express.json(), getAllCharges);

// Refund
paymentRouter.get("/refund", express.json(), refundController);

// Create Customer
paymentRouter.get("/customers", express.json(), createCustomer);

// Create Subscription
paymentRouter.get("/subscription", express.json(), subscriptionController);

// Get Payment Status
paymentRouter.get("/status/:paymentIntentId", express.json(), getPaymentStatus);

module.exports = paymentRouter;
