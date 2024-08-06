const express = require("express");
const router = express.Router();

const shoppingListController = require("../../controllers/shoppingList/shoppingListController");

router.get(
  "/recipes/:id/shopping-list",
  shoppingListController.getIngredientsByRecipe
);

module.exports = router;
