const Category = require("../models/Categories");

const getCategories = async () => {
  return Category.find();
};

module.exports = {
  getCategories,
};
