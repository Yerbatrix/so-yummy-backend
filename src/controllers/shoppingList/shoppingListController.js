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

    const shoppingList = await shoppingListService.addProductToShoppingList(
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

const deleteProductFromShoppingList = async (req, res) => {
  try {
    const { productId } = req.params;
    const { user } = req;
    const result = await shoppingListService.removeProductFromList(
      productId,
      user._id
    );
    res.json({
      status: "success",
      code: 200,
      data: { productId, data: { result } },
    });
  } catch (e) {
    console.error(e);
  }
};

const getProductsFromShoppingList = async (req, res) => {};

module.exports = {
  getIngredientsByRecipe,
  addIngredientToShoppingList,
  deleteProductFromShoppingList,
  getProductsFromShoppingList,
};
