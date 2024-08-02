const express = require("express");
const router = express.Router();
const {
  register,
  signin,
  getUserInfo,
  updateUserInfo,
  uploadAvatar,
  logout,
} = require("../../controllers/auth/authController");
const upload = require("../../middleware/upload");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });

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
 * /auth/avatar:
 *   put:
 *     summary: Update user avatar
 *     tags: [Auth]
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
 *         description: Successfully updated user avatar
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/avatar", auth, upload.single("avatar"), uploadAvatar);

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

module.exports = router;
