const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });
const shoppingListController = require("../../controllers/shoppingList/shoppingListController");

/**
 * @swagger
 * /api/recipes/{id}/shopping-list:
 *   get:
 *     summary: Get ingredients by recipe ID
 *     tags: [ShoppingList]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the recipe
 *     responses:
 *       200:
 *         description: List of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 */
router.get(
  "/recipes/:id/shopping-list",
  auth,
  shoppingListController.getIngredientsByRecipe
);

/**
 * @swagger
 * /api/recipes/{id}/shopping-list:
 *   post:
 *     summary: Add ingredient to shopping list
 *     tags: [ShoppingList]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ingredientId:
 *                 type: string
 *                 description: The ID of the ingredient
 *     responses:
 *       201:
 *         description: Ingredient added to shopping list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingList'
 *       500:
 *         description: Server error
 */
router.post(
  "/recipes/:id/shopping-list",
  auth,
  shoppingListController.addIngredientToShoppingList
);

/**
 * @swagger
 * /api/shopping-list/{productId}:
 *   delete:
 *     summary: Remove product from shopping list
 *     tags: [ShoppingList]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Product removed from shopping list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                   description: The ID of the removed product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/shopping-list/:productId",
  auth,
  shoppingListController.deleteProductFromShoppingList
);

/**
 * @swagger
 * /api/shopping-list:
 *   get:
 *     summary: Get products from shopping list
 *     tags: [ShoppingList]
 *     responses:
 *       200:
 *         description: List of products in the shopping list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShoppingList'
 *       500:
 *         description: Server error
 */
router.get(
  "/shopping-list",
  auth,
  shoppingListController.getProductsFromShoppingList
);

module.exports = router;
