const express = require('express');
const { getRecipes, getRecipeById, createRecipe } = require('../../controllers/recipes/recipeController');
const authMiddleware = require('../../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, getRecipes);
router.get('/:id', authMiddleware, getRecipeById);
router.post('/', authMiddleware, createRecipe);

module.exports = router;
