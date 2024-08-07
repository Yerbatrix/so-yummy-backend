const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });
const shoppingListController = require("../../controllers/shoppingList/shoppingListController");

router.get(
  "/recipes/:id/shopping-list",
  auth,
  shoppingListController.getIngredientsByRecipe
);
router.post(
  "/recipes/:id/shopping-list",
  auth,
  shoppingListController.addIngredientToShoppingList
);

router.delete(
  "/shopping-list",
  auth,
  shoppingListController.deleteProductFromShoppingList
);
router.get(
  "/shopping-list",
  auth,
  shoppingListController.getProductsFromShoppingList
);

module.exports = router;
