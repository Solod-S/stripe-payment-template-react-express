/**
 * @swagger
 * /api/payment/charges:
 *   get:
 *     summary: Get all completed payments
 *     description: Retrieves a list of all completed charges.
 *     responses:
 *       200:
 *         description: List of charges
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
 *                         example: "ch_123456789"
 *                       amount:
 *                         type: integer
 *                         example: 5000
 *                       currency:
 *                         type: string
 *                         example: "usd"
 *       500:
 *         description: Internal server error
 */
