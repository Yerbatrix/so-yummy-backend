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

const addIngredientToShoppingList = async (req, res) => {
  try {
    const { ingredientId } = req.body;
    const { id } = req.params;
    const { user } = req;

    const shoppingList = await shoppingListService.addIngredientToShoppingList(
      user._id,
      ingredientId,
      id
    );

    res.status(201).json({
      status: "success",
      code: 201,
      data: shoppingList,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getIngredientsByRecipe,
  addIngredientToShoppingList,
};
