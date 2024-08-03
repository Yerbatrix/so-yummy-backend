const mongoose = require("mongoose");
const { Schema } = mongoose;

const category = new Schema(
  {
    title: {
      type: String,
    },
    thumb: { type: String },
    description: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const Category = mongoose.model("category", category, "categoriesList");

module.exports = Category;
