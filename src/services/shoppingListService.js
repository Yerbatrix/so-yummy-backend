const Ingredient = require("../models/Ingredient");
const Recipe = require("../models/Recipe");

const getIngredientsByRecipeId = async (id) => {
  const recipe = await Recipe.findById(id, { ingredients: 1, _id: 0 });
  const ingredientsIds = recipe.ingredients.map((ingredient) => ingredient.id);
  const ingredients = await Ingredient.find({ _id: { $in: ingredientsIds } });

  return await ingredients;
};

module.exports = {
  getIngredientsByRecipeId,
};
