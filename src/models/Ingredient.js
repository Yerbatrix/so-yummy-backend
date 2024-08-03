const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  ttl: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  t: {
    type: String,
  },
  thb: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Ingredient", ingredientSchema);
