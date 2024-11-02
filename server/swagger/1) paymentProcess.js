/**
 * @swagger
 * /api/payment/process-payment:
 *   post:
 *     summary: Create a payment session
 *     description: Creates a Stripe payment session.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 example: 5000
 *               sites:
 *                 type: number
 *                 example: 3
 *               period:
 *                 type: string
 *                 example: "monthly"
 *     responses:
 *       200:
 *         description: Payment session created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "session_id"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Internal server error
 */