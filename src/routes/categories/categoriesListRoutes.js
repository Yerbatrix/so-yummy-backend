const express = require("express");
const router = express.Router();

const categoriesController = require("../../controllers/categories/categoriesController");

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get list of categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *       500:
 *         description: Server error
 */
router.get("/", categoriesController.get);

module.exports = router;
