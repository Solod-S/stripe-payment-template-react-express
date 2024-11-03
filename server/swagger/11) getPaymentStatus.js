/**
 * @swagger
 * /api/payment/status/{paymentIntentId}:
 *   get:
 *     tags:
 *       - Payments
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
