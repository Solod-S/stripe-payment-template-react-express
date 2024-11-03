/**
 * @swagger
 * /api/payment/get-all-prices:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Retrieve all prices and the current subscription for a user
 *     description: Fetches all active prices for a specified product and checks for an active subscription linked to a given email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Successfully retrieved prices and subscription info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentSubscription:
 *                   type: object
 *                   nullable: true
 *                   description: Details of the current subscription if found
 *                 prices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "price_1Hx1ye2eZvKYlo2C0Hb1N"
 *                       product:
 *                         type: string
 *                         example: "prod_ABC1234"
 *                       unit_amount:
 *                         type: integer
 *                         example: 2000
 *                       currency:
 *                         type: string
 *                         example: "usd"
 *                       recurring:
 *                         type: object
 *                         properties:
 *                           interval:
 *                             type: string
 *                             example: "month"
 *                           interval_count:
 *                             type: integer
 *                             example: 1
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error while getting stripe's prices"
 */
