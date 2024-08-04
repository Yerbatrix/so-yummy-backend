const Ingredient = require("../models/Ingredient");

const getIngredients = async () => {
  return Ingredient.find({}, { ttl: 1 });
};

module.exports = {
  getIngredients,
};


