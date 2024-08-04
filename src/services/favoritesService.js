// const User = require("../models/User");
const Recipe = require("../models/Recipe");

const updateFavoriteStatus = async (recipeId, userId) => {
  console.log("Updating recipe:", recipeId, "with user:", userId);
  return Recipe.findByIdAndUpdate(
    recipeId,
    { $addToSet: { favorites: userId } },
    { new: true, upsert: false }
  );
};
module.exports = {
  updateFavoriteStatus,
};
