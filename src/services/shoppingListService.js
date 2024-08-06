const Ingredient = require("../models/Ingredient");
const Recipe = require("../models/Recipe");

const getIngredientsByRecipeId = async (id) => {
  const recipe = await Recipe.findById(id, { ingredients: 1, _id: 0 });
  const ingredientsData = recipe.ingredients.map((ingredient) => ({
    id: ingredient.id,
    measure: ingredient.measure,
  }));
  const ingredientDetails = await Ingredient.find(
    { _id: { $in: ingredientsData.map((ingredient) => ingredient.id) } },
    { ttl: 1, thb: 1 }
  );
  const detailedIngredients = ingredientsData.map((recipeIngredient) => {
    const ingredientDetail = ingredientDetails.find((ingredient) =>
      ingredient._id.equals(recipeIngredient.id)
    );
    return {
      measure: recipeIngredient.measure,
      ttl: ingredientDetail ? ingredientDetail.ttl : null,
      thb: ingredientDetail ? ingredientDetail.thb : null,
    };
  });

  return detailedIngredients;
};

module.exports = {
  getIngredientsByRecipeId,
};
