const { User } = require("../../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
