const express = require("express");
const router = express.Router();

const ingredientsController = require("../../controllers/ingredients/ingredientsController");

/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: Zarządzanie składnikami
 */

/**
 * @swagger
 * /api/ingredients/list:
 *   get:
 *     summary: Pobierz listę składników
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: Lista składników
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
 *                         $ref: '#/components/schemas/Ingredient'
 *       500:
 *         description: Błąd serwera
 */
router.get("/list", ingredientsController.getIngredientsList);

/**
 * @swagger
 * /api/ingredients:
 *   get:
 *     summary: Pobierz przepisy według składnika
 *     tags: [Ingredients]
 *     parameters:
 *       - in: query
 *         name: ttl
 *         schema:
 *           type: string
 *         required: true
 *         description: Tytuł składnika
 *     responses:
 *       200:
 *         description: Lista przepisów zawierających dany składnik
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
 *                     recipes:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Brak zapytania
 *       500:
 *         description: Błąd serwera
 */
router.get("/", ingredientsController.getReceipeByIngredient);

module.exports = router;
