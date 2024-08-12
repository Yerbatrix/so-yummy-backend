const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShoppingListSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ingredients: [
      {
        id: {
          type: String,
          required: true,
        },
        ttl: {
          type: String,
          required: true,
        },
        measure: {
          type: String,
          required: true,
        },
        thb: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const ShoppingList = mongoose.model(
  "ShoppingList",
  ShoppingListSchema,
  "shoppinglists"
);

module.exports = ShoppingList;
