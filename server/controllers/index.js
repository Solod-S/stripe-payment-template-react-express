const { ctrlWrapper } = require("../middlewares");

const processPayment = require("./processPayment");
const processSubscription = require("./processSubscription");
const updateSubscriptionPlan = require("./updateSubscriptionPlan");
const cancelSubscription = require("./cancelSubscription");
const getAllPrices = require("./getAllPrices");
const callbackWebhook = require("./callbackWebhook");
const getAllPayments = require("./getAllPayments");
const getAllCharges = require("./getAllCharges");
const refundController = require("./refundController");
const createCustomer = require("./createCustomer");
const subscriptionController = require("./subscriptionController");
const getPaymentStatus = require("./getPaymentStatus");

module.exports = {
  processPayment: ctrlWrapper(processPayment),
  processSubscription: ctrlWrapper(processSubscription),
  updateSubscriptionPlan: ctrlWrapper(updateSubscriptionPlan),
  cancelSubscription: ctrlWrapper(cancelSubscription),
  getAllPrices: ctrlWrapper(getAllPrices),
  callbackWebhook: ctrlWrapper(callbackWebhook),
  getAllPayments: ctrlWrapper(getAllPayments),
  getAllCharges: ctrlWrapper(getAllCharges),
  refundController: ctrlWrapper(refundController),
  createCustomer: ctrlWrapper(createCustomer),
  subscriptionController: ctrlWrapper(subscriptionController),
  getPaymentStatus: ctrlWrapper(getPaymentStatus),
};
