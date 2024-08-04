const Ingredient = require("../models/Ingredient");
const Recipe = require("../models/Recipe");

const getIngredients = async () => {
  return Ingredient.find({}, { ttl: 1 });
};

const getReceipeByIngredients = async (ttl) => {
  const ingredient = await Ingredient.findOne({ ttl });

  if (!ingredient) {
    return [];
  }

  return Recipe.find({ "ingredients.id": ingredient._id });
};

module.exports = {
  getIngredients,
  getReceipeByIngredients,
};
