const { User, userValidationSchema } = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup
exports.register = async (req, res, next) => {
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.jwtToken = token;
    await user.save();

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

// signin
exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.jwtToken = token;
    await user.save();

    res.json({ token });
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

    // Usunięcie starego avatara jeśli istnieje
    if (user.avatar) {
      fs.unlinkSync(path.join(__dirname, "../../uploads", user.avatar));
    }

    user.avatar = req.file.filename;
    await user.save();
    res.json({ msg: "Avatar uploaded successfully", avatar: user.avatar });
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
