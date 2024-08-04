const express = require("express");
const router = express.Router();

const ingredientsController = require("../../controllers/ingredients/ingredientsController");

router.get("/list", ingredientsController.getIngredientsList);
router.get("/", ingredientsController.getReceipeByIngredient);

module.exports = router;
