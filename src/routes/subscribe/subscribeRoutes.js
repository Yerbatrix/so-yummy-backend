const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  subscription,
} = require("../../controllers/subscribe/subscribeController");
const auth = passport.authenticate("jwt", { session: false });

/**
 * @swagger
 * /api/subscribe:
 *   post:
 *     summary: Subscribe to newsletter
 *     tags: [Subscribe]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Subscription email sent
 *       400:
 *         description: Bad request or already subscribed
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", auth, subscription);

module.exports = router;
