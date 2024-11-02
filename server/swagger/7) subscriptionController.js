/**
 * @swagger
 * /api/payment/subscription:
 *   post:
 *     summary: Create a subscription
 *     description: Creates a subscription for a customer. Ensure that the customer and price IDs are valid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: "cus_123456789"
 *                 description: The ID of the customer for whom the subscription is created.
 *               priceId:
 *                 type: string
 *                 example: "price_123456789"
 *                 description: The ID of the price plan for the subscription.
 *     responses:
 *       200:
 *         description: Subscription successfully created
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
 *                       example: "sub_123456789"
 *                       description: The ID of the created subscription.
 *                     status:
 *                       type: string
 *                       example: "active"
 *                       description: The status of the subscription.
 *       400:
 *         description: Bad Request - Invalid customerId or priceId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid customer ID or price ID."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error."
 */
