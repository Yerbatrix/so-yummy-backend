const express = require("express");
const router = express.Router();
const passport = require("passport");
const favoritesController = require("../../controllers/favorites/favoritesController");
const auth = passport.authenticate("jwt", { session: false });

router.post("/:id/favorite", auth, favoritesController.addToFavorites);
router.get("/favorite", auth, favoritesController.getFavorites);
router.delete("/:id/favorite", auth, favoritesController.removeFromFavorites);

module.exports = router;
