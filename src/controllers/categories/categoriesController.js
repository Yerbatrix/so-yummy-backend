const categoriesService = require("../../services/categoriesService");

const get = async (req, res, next) => {
  try {
    const { query } = req;

    const results = await categoriesService.getCategories({
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
module.exports = {
  get,
};
