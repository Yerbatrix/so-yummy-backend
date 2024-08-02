const { User } = require("../../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

// signup
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "Email in use" });
    }
    const newUser = new User({
      name,
      email,
    });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      user: {
        name,
        email,
      },
    });
  } catch (err) {
    next(err);
  }
};

// signin
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
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
    const user = await User.findById(req.user.id).select("-password -jwtToken");
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUserInfo = async (req, res, next) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password -jwtToken");
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.uploadAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Sprawdzenie, czy użytkownik ma już avatar
    if (user.avatar) {
      const oldAvatarPath = path.join(__dirname, "../../uploads", user.avatar);
      try {
        await fs.unlink(oldAvatarPath);
        console.log(`Deleted old avatar: ${oldAvatarPath}`);
      } catch (err) {
        if (err.code !== "ENOENT") {
          console.error(`Failed to delete old avatar: ${oldAvatarPath}`, err);
          return next(err); // Zakończ funkcję w przypadku błędu
        }
      }
      user.avatar = null; // Ustawienie właściwości avatar na null
      await user.save();
    }

    // Upload nowego avatara
    const newAvatarName = `${uuidv4()}-${req.file.originalname}`;
    const newAvatarPath = path.join(__dirname, "../../uploads", newAvatarName);
    try {
      await fs.rename(req.file.path, newAvatarPath);
    } catch (err) {
      console.error("Failed to move the new avatar file:", err);
      return next(err);
    }

    user.avatar = newAvatarName;
    await user.save();
    res.json({ msg: "Avatar uploaded successfully", avatar: user.avatar });
  } catch (err) {
    console.error("Error uploading avatar:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.logout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    user.jwtToken = null;
    await user.save();
    res.json({ msg: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
