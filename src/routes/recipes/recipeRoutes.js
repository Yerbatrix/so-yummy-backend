const express = require("express");
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  searchRecipes,
} = require("../../controllers/recipes/recipeController");

const router = express.Router();

router.get("/search", searchRecipes);
router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.post("/", createRecipe);

module.exports = router;
