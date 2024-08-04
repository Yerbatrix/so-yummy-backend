const favoriteService = require("../../services/favoritesService");

const addToFavorites = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const result = await favoriteService.updateFavoriteStatus(id, userId);

    res.json({ status: "success", code: 200, data: { result } });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  addToFavorites,
};
