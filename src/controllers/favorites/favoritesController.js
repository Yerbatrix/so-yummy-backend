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

const getFavorites = async (req, res, next) => {
  try {
    const { user } = req;
    const results = await favoriteService.getUserFavorites(user._id);
    res.json({ status: "success", code: 200, data: { contacts: results } });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  addToFavorites,
  getFavorites,
};
