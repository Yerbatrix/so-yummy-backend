const Recipe = require("../../models/Recipe");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Joi = require("joi");

const addRecipeSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  instructions: Joi.string().required(),
  description: Joi.string().required(),
  time: Joi.string().required(),

  ingredients: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        measure: Joi.string().required(),
      })
    )
    .required(),
  preparation: Joi.string().required(),
});

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
    // Przekształć składniki na właściwy format
    const parsedIngredients = JSON.parse(ingredients).map((ingredient) => ({
      id: new mongoose.Types.ObjectId(ingredient.id),
      measure: ingredient.measure,
    }));

    // Utwórz nowy przepis
    const newRecipe = new Recipe({
      title,
      category,
      area: "unknown", // Domyślna wartość
      instructions,
      description,
      thumb: req.file ? req.file.filename : null, // Przypisz nazwę pliku lub null
      preview: req.file ? req.file.filename : null, // Przypisz nazwę pliku jako podgląd lub null
      time,
      ingredients: parsedIngredients, // Przekształcone składniki
      author: req.user._id, // Przypisz autora
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

// Get recipes by category - pagination added
const getRecipesByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 8 } = req.query;

  try {
    const recipes = await Recipe.find({ category })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Recipe.countDocuments({ category });

    res.status(200).json({
      recipes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get recipes by category for main page
const getRecipesByCategoryMain = async (req, res) => {
  const { category } = req.params;
  try {
    const recipes = await Recipe.find({ category });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get popular recipes
const getPopularRecipes = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const recipes = await Recipe.find({ "favorites.0": { $exists: true } })
      .sort({ favorites: -1 })
      .limit(limit);

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Sorry! Recipe not found" });
    }

    // Usuń plik obrazka, jeśli istnieje
    if (recipe.thumb) {
      const imagePath = path.join(
        __dirname,
        "../../../uploads/recipes",
        recipe.thumb
      );
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete image:", err.message);
        } else {
          console.log("Image deleted:", imagePath);
        }
      });
    }

    await Recipe.findByIdAndDelete(req.params.id);

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
  getRecipesByCategoryMain,
  getPopularRecipes,
};
