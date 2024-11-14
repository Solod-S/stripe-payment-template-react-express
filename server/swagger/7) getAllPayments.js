/**
 * @swagger
 * /api/payment/payments:
 *   get:
 *     tags:
 *       - Payments
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
