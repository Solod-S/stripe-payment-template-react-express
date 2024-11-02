/**
 * @swagger
 * /api/payment/webhook:
 *   post:
 *     summary: Handle payment webhook
 *     description: Stripe webhook for processing payment events.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook received
 *       400:
 *         description: Signature verification failed
 */
