const categoriesService = require("../../services/categoriesService");

const get = async (req, res, next) => {
  try {
    const results = await categoriesService.getCategories();

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
module.exports = {
  get,
};
