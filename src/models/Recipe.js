const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
  },
  measure: String,
});

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: false,
    },
    preview: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: true,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    youtube: String,
    tags: [String],
    ingredients: [ingredientSchema],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
