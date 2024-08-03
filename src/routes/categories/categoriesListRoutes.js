const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const categoriesController = require("../../controllers/categories/categoriesController");

router.get("/recipes/category-list", auth, categoriesController.get);

module.exports = router;
