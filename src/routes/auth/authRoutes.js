const express = require("express");
const router = express.Router();
const {
  register,
  signin,
  getUserInfo,
  updateUserInfo,
  logout,
  uploadAvatar,
} = require("../../controllers/auth/authController");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });
const upload = require("../../middleware/upload");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: User with that email address already exists
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       400:
 *         description: Invalid Credentials
 */
router.post("/signin", signin);

/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: Get user information
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully fetched user information
 *       401:
 *         description: Unauthorized
 */
router.get("/user", auth, getUserInfo);

/**
 * @swagger
 * /auth/user:
 *   put:
 *     summary: Update user information
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated user information
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/user", auth, updateUserInfo);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized
 */
router.post("/logout", auth, logout);

/**
 * @swagger
 * /api/auth/avatar:
 *   post:
 *     summary: Upload user avatar
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/avatar", auth, upload.single("avatar"), uploadAvatar);

module.exports = router;
