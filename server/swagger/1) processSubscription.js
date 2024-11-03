/**
 * @swagger
 * /api/payment/process-subscription:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Create a subscription session
 *     description: Initiates a Stripe checkout session for a subscription with the provided price ID and user email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               priceId:
 *                 type: string
 *                 description: ID of the price for subscription
 *                 example: "price_1QGxj4EizOkxUbXdDudblcwL"
 *               userEmail:
 *                 type: string
 *                 description: User's email address
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Stripe checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *                   example: "cs_test_a1b2c3d4e5f6g7h8i9j0"
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error in stripe checkout session: Something went wrong"
 */
