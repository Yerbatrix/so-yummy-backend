const shoppingListService = require("../../services/shoppingListService");

const getIngredientsByRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const ingredients = await shoppingListService.getIngredientsByRecipeId(id);
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getIngredientsByRecipe,
};
