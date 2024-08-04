// const User = require("../models/User");
const Recipe = require("../models/Recipe");

const updateFavoriteStatus = async (recipeId, userId) => {
  return Recipe.findByIdAndUpdate(
    recipeId,
    { $addToSet: { favorites: userId } },
    { new: true }
  );
};
module.exports = {
  updateFavoriteStatus,
};
