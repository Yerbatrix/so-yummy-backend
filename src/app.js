const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { swaggerUI, swaggerDocs } = require("./config/swagger");
const authRoutes = require("./routes/auth/authRoutes");
const recipeRoutes = require("./routes/recipes/recipeRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

module.exports = app;
