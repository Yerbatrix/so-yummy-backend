const express = require("express");
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  searchRecipes,
  deleteRecipeById,
} = require("../../controllers/recipes/recipeController");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });
const router = express.Router();

/**
 * @swagger
 * /api/recipes/search:
 *   get:
 *     summary: Search for recipes by keyword in title
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         description: The keyword to search for in recipe titles
 *     responses:
 *       200:
 *         description: A list of recipes matching the search keyword
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Missing keyword query parameter
 *       404:
 *         description: No recipes found matching the keyword
 */
router.get("/recipes/search", searchRecipes);

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       500:
 *         description: Server error
 */
router.get("/", getRecipes);

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get a recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the recipe to get
 *     responses:
 *       200:
 *         description: The recipe data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getRecipeById);

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       201:
 *         description: The created recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       500:
 *         description: Server error
 */
router.post("/", createRecipe);

/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     summary: Delete a recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the recipe to delete
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteRecipeById);

module.exports = router;
