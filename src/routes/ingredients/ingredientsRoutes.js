const express = require("express");
const router = express.Router();

const ingredientsController = require("../../controllers/ingredients/ingredientsController");

router.get("/api/ingredients/list", ingredientsController.getIngredientsList);
// router.get("api/ingredients", ingredientsController.getReceipeByIngredient);

module.exports = router;
