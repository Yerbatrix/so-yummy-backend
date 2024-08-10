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
const favoriteRoutes = require("./routes/favorite/favoriteRoutes");
const ingredientsRoutes = require("./routes/ingredients/ingredientsRoutes");
const categoriesRoutes = require("./routes/categories/categoriesListRoutes");
const subscribeRoutes = require("./routes/subscribe/subscribeRoutes");
const shoppingListRoutes = require("./routes/shoppingList/shoppingListRoutes");
const errorHandler = require("./middleware/errorHandler");
const passport = require("./config/passport");
dotenv.config();

const app = express();

const uploadsDirAvatars = path.join(__dirname, "./uploads/avatars");
const uploadsDirRecipes = path.join(__dirname, "./uploads/recipes");

if (!fs.existsSync(uploadsDirAvatars)) {
  fs.mkdirSync(uploadsDirAvatars, { recursive: true });
}

if (!fs.existsSync(uploadsDirRecipes)) {
  fs.mkdirSync(uploadsDirRecipes, { recursive: true });
}

app.use("/uploads/avatars", express.static(uploadsDirAvatars));
app.use("/uploads/recipes", express.static(uploadsDirRecipes));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: ["https://soyummy-t4.netlify.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(passport.initialize());

app.use("/uploads/avatars", express.static(uploadsDirAvatars));
app.use("/uploads/recipes", express.static(uploadsDirRecipes));
// Routes

app.use("/api/auth", authRoutes);
app.use("/api/recipes/category-list", categoriesRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/ingredients", ingredientsRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api", shoppingListRoutes);

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
