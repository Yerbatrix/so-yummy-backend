const Recipe = require("../../models/Recipe");

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Sorry! Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Sorry! Recipe not found" });
    }
    res.status(500).send("Server error");
  }
};

// Add a recipe
const createRecipe = async (req, res) => {
  const {
    title,
    category,
    area,
    instructions,
    description,
    thumb,
    preview,
    time,
    ingredients,
  } = req.body;

  try {
    const newRecipe = new Recipe({
      title,
      category,
      area,
      instructions,
      description,
      thumb,
      preview,
      time,
      ingredients,
      author: req.user._id,
    });

    const recipe = await newRecipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get recipes by category
const getRecipesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const recipes = await Recipe.find({ category }).limit(8);;
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Search recipes by keyword
const searchRecipes = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res
        .status(400)
        .json({ message: 'Parametr query "keyword" jest wymagany' });
    }
    const regex = new RegExp(keyword, "i");
    const recipes = await Recipe.find({ title: { $regex: regex } });
    if (recipes.length === 0) {
      return res.status(404).json({ message: "Sorry! Recipe not found" });
    }
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete recipe found by ID
const deleteRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Sorry! Recipe not found" });
    }
    if (recipe.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this recipe" });
    }
    await recipe.remove();
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Sorry! Recipe not found" });
    }
    res.status(500).send("Server error");
  }
};

//Get list of own recipies
const getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ owner: req.user.id });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  searchRecipes,
  deleteRecipeById,
  getUserRecipes,
  getRecipesByCategory,
};
