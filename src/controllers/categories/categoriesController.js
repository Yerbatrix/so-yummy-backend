const categoriesServise = require("../../services/categoriesService");

const get = async (req, res, next) => {
  try {
    const { query } = req;
    const results = await categoriesServise.getCategories({
      ...query,
    });
    res.json({ status: "success", code: 200, data: { categories: results } });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
module.exports = {
  get,
};
