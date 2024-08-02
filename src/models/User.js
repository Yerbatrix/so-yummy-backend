const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  daysInApp: {
    type: Number,
    default: 0,
  },
  recipesAdded: {
    type: Number,
    default: 0,
  },
  favoriteRecipesCount: {
    type: Number,
    default: 0,
  },
  jwtToken: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: null,
  },
});

const userValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const User = mongoose.model("User", UserSchema);

module.exports = { User, userValidationSchema };
