const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });
const subscribeController = require("../../controllers/subscribe/subscribeController");

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
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/", auth, subscribeController.subscription);

module.exports = router;
