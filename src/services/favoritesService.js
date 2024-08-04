// const User = require("../models/User");
const Recipe = require("../models/Recipe");

const updateFavoriteStatus = async (recipeId, userId) => {
  return Recipe.findByIdAndUpdate(
    recipeId,
    { $addToSet: { favorites: userId } },
    { new: true, upsert: false }
  );
};

const getUserFavorites = async (userId) => {
  return Recipe.find({ favorites: userId });
};
module.exports = {
  updateFavoriteStatus,
  getUserFavorites,
};
