/**
 * @swagger
 * /api/payment/refund:
 *   post:
 *     tags:
 *       - Payments
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
