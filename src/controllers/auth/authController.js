const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../../models/User");
const authService = require("../../services/authService");
const fs = require("fs");
const path = require("path");
const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z\s]+$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/\d/)
    .required(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/\d/)
    .required(),
});

// signup
exports.register = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password } = req.body;

  try {
    let existingUser = await authService.checkEmailAddress(email);
    if (existingUser) {
      return res.status(409).json({ msg: "Email in use" });
    }
    const newUser = new User({
      name,
      email,
    });
    newUser.setPassword(password);

    // Generate JWT token
    const payload = { id: newUser._id, email: newUser.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    newUser.jwtToken = token;
    await newUser.save();

    res.status(201).json({
      token,
      user: {
        name,
        email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

// signin
exports.signin = async (req, res, next) => {
  const { error } = signInSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;
  try {
    const user = await authService.checkEmailAddress(email);
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ msg: "Email or password is wrong" });
    }
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.jwtToken = token;
    await user.save();
    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUserInfo = async (req, res, next) => {
  try {
    const updates = req.body;
    const user = await authService.updateUserData(req.user.id, updates);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    user.jwtToken = null;
    await user.save();
    res.json({ msg: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

exports.uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user);

    // Delete old avatar if exists
    if (user.avatar) {
      const oldAvatarPath = path.join(
        __dirname,
        "../../uploads/avatars",
        user.avatar
      );

      console.log("Old avatar path:", oldAvatarPath);

      // Check if the file exists before attempting to delete it
      try {
        if (fs.existsSync(oldAvatarPath)) {
          fs.unlinkSync(oldAvatarPath);
          console.log("Old avatar deleted successfully");
        } else {
          console.log("File does not exist:", oldAvatarPath);
        }
      } catch (err) {
        console.log("Error accessing or deleting old avatar:", err.message);
      }
    }

    // Update user with new avatar
    user.avatar = req.file.filename;
    await user.save();

    console.log("New avatar saved for user:", user);

    res.json({ status: "success", code: 200, data: { avatar: user.avatar } });
  } catch (error) {
    next(error);
  }
};
