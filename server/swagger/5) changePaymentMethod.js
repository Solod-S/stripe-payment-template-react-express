/**
 * @swagger
 * /api/payment/change-payment-method:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Change payment method for a customer
 *     description: Creates a session for the Stripe Customer Portal where a user can change their payment method.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *                 description: "The email of the user whose payment method needs to be changed."
 *             required:
 *               - userEmail
 *     responses:
 *       200:
 *         description: Customer Portal session URL created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: "The URL to the Stripe Customer Portal where the user can change their payment method."
 *                   example: "https://billing.stripe.com/session/xyz123"
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
 *         description: Customer not found
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
