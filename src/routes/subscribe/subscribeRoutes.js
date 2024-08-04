const express = require("express");
const router = express.Router();

const subscribeController = require("../../controllers/subscribe/subscribeController");

/**
 * @swagger
 * /api/subscribe:
 *   post:
 *     summary: Subscribe to newsletter
 *     tags: [Subscribe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *     responses:
 *       200:
 *         description: Subscription email sent
 *       400:
 *         description: Missing required field email
 *       404:
 *         description: You are already subscribed to our newsletter
 */
router.post("/", subscribeController.subscription);

module.exports = router;
