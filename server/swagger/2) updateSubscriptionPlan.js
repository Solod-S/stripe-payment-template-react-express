/**
 * @swagger
 * /api/payment/update-subscription-plan:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Update a customer's subscription plan
 *     description: Updates an active subscription for a customer to a new price plan.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPriceId:
 *                 type: string
 *                 description: ID of the new price for the subscription
 *                 example: "price_1Hx1ye2eZvKYlo2C0Hb1N"
 *               userEmail:
 *                 type: string
 *                 description: Customer's email address
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 updatedSubscription:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "si_1IY2aQC9ZyRYlo2CSUmBYRja"
 *                     price:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "price_1Hx1ye2eZvKYlo2C0Hb1N"
 *                 subscriptionId:
 *                   type: string
 *                   example: "sub_49ty4767H20z6a"
 *                 subscriptionStatus:
 *                   type: string
 *                   example: "active"
 *       403:
 *         description: Unauthorized request due to missing user email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized request"
 *       404:
 *         description: Customer or active subscription not found
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
 *                   example: "Error updating subscription plan: Something went wrong"
 */
