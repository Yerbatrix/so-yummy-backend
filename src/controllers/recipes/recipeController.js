const Recipe = require("../../models/Recipe");
const mongoose = require("mongoose");

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
  const { title, category, instructions, description, time, ingredients } =
    req.body;

  try {
    // Sprawdź, czy plik został przesłany
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Przekształć składniki na właściwy format
    const parsedIngredients = JSON.parse(ingredients).map((ingredient) => ({
      id: new mongoose.Types.ObjectId(ingredient.id),
      measure: ingredient.measure,
    }));

    // Utwórz nowy przepis
    const newRecipe = new Recipe({
      title,
      category,
      area: "unknown",
      instructions,
      description,
      thumb: req.file.filename,
      preview: req.file.filename,
      time,
      ingredients: parsedIngredients,
      author: req.user._id,
    });

    const recipe = await newRecipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Get list of own recipes
const getOwnRecipes = async (req, res) => {
  console.log("Authenticated user:", req.user);
  try {
    const recipes = await Recipe.find({ author: req.user._id });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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

// Get recipes by category
const getRecipesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const recipes = await Recipe.find({ category }).limit(8);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Sorry! Recipe not found" });
    }
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Sorry! Recipe not found" });
    }
    res.status(500).send("Server error");
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  getOwnRecipes,
  searchRecipes,
  getRecipesByCategory,
  deleteRecipeById,
};
