const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
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
  subscription: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const userValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const User = mongoose.model("User", UserSchema);

module.exports = { User, userValidationSchema };
