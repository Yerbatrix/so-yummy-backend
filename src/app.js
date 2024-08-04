const fs = require("fs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { swaggerUI, swaggerDocs } = require("./config/swagger");
const authRoutes = require("./routes/auth/authRoutes");
const recipeRoutes = require("./routes/recipes/recipeRoutes");
const favoritesRoutes = require("./routes/favorite/favoriteRoutes");
const userFavoritesRoutes = require("./routes/favorite/favoriteRoutes");
const errorHandler = require("./middleware/errorHandler");
const passport = require("./config/passport");

dotenv.config();

const app = express();

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/recipes", recipeRoutes);
app.use("/api/recipes", favoritesRoutes);
app.use("/api/user", userFavoritesRoutes);
// Error handling middleware
app.use(errorHandler);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.log("Database connection error:", error.message);
    process.exit(1);
  });

module.exports = app;
