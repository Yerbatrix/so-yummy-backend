const express = require("express");
const router = express.Router();
const passport = require("passport");
const favoritesController = require("../../controllers/favorites/favoritesController");
const auth = passport.authenticate("jwt", { session: false });

router.post(
  "/api/recipes/:id/favorite",
  auth,
  favoritesController.addToFavorites
);
router.get("/api/user/favorite", auth, favoritesController.getFavorites);

module.exports = router;
