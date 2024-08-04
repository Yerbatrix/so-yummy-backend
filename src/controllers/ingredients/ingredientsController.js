const ingredientsService = require("../../services/ingredientsService");

const getIngredientsList = async (req, res, next) => {
  try {
    const { query } = req;

    const results = await ingredientsService.getIngredients({
      ...query,
    });

    console.log(query);
    res.json({
      status: "success",
      code: 200,
      data: { categories: results },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getReceipeByIngredient = async (req, res, next) => {
  try {
    const { ttl } = req.query;
    if (!ttl) {
      return res.status(400).json({ message: "Missing query" });
    }

    const results = await ingredientsService.getReceipeByIngredients(ttl);

    res.json({
      status: "success",
      code: 200,
      data: { recipes: results },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  getIngredientsList,
  getReceipeByIngredient,
};
