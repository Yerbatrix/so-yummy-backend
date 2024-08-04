const express = require("express");
const router = express.Router();

const favoritesController = require("../../controllers/categories/categoriesController");

router.post("/", categoriesController.get);

module.exports = router;