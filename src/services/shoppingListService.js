const Ingredient = require("../models/Ingredient");
const Recipe = require("../models/Recipe");
const ShoppingList = require("../models/ShoppingList");

const getIngredientsByRecipeId = async (id) => {
  const recipe = await Recipe.findById(id, { ingredients: 1, _id: 0 });
  const ingredientsData = recipe.ingredients.map((ingredient) => ({
    id: ingredient.id,
    measure: ingredient.measure,
  }));
  const ingredientDetails = await Ingredient.find(
    { _id: { $in: ingredientsData.map((ingredient) => ingredient.id) } },
    { ttl: 1, thb: 1, id: 1 }
  );
  const detailedIngredients = ingredientsData.map((recipeIngredient) => {
    const ingredientDetail = ingredientDetails.find((ingredient) =>
      ingredient._id.equals(recipeIngredient.id)
    );
    return {
      id: ingredientDetail._id,
      measure: recipeIngredient.measure,
      ttl: ingredientDetail ? ingredientDetail.ttl : null,
      thb: ingredientDetail ? ingredientDetail.thb : null,
    };
  });

  return detailedIngredients;
};

const addProductToShoppingList = async (userId, ingredientId, recipeId) => {
  try {
    const ingredientDetail = await Ingredient.findById(ingredientId);
    const recipe = await Recipe.findOne(
      { _id: recipeId, "ingredients.id": ingredientId },
      { "ingredients.$": 1 }
    );

    const measure = recipe.ingredients[0].measure;

    const ingredient = {
      id: ingredientDetail._id,
      ttl: ingredientDetail.ttl,
      measure: measure,
      thb: ingredientDetail.thb,
    };

    const shoppingList = await ShoppingList.findOneAndUpdate(
      { owner: userId },
      { $push: { ingredients: ingredient } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return shoppingList;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

module.exports = {
  getIngredientsByRecipeId,
  addProductToShoppingList,
};
