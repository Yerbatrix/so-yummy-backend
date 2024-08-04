const Category = require("../models/Category");

const getCategories = async () => {
  return Category.find({}, { title: 1 }).sort({ title: 1 });
};

module.exports = {
  getCategories,
};
