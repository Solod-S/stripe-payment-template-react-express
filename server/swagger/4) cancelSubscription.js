/**
 * @swagger
 * /api/payment/cancel-subscription-plan:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Cancel an active subscription plan
 *     description: Cancels an active subscription plan for a customer identified by their email. The subscription will be canceled at the end of the current billing period.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: "User's authentication token (if needed)."
 *               userEmail:
 *                 type: string
 *                 description: "The email of the user whose subscription is to be canceled."
 *             required:
 *               - userEmail
 *     responses:
 *       200:
 *         description: Subscription canceled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Subscription canceled successfully
 *                 subscriptionId:
 *                   type: string
 *                   description: "The ID of the canceled subscription"
 *                   example: sub_1IlLZm2eZvKYlo2CJiWfPTx
 *                 subscriptionStatus:
 *                   type: string
 *                   description: "The status of the canceled subscription"
 *                   example: canceled
 *                 endSubscriptionPeriodHumanEndDate:
 *                   type: string
 *                   description: "The end date of the current subscription period in human-readable format"
 *                   example: "2024-12-31 23:59:59"
 *       403:
 *         description: Unauthorized request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized request
 *       404:
 *         description: Customer or subscription not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Customer not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
