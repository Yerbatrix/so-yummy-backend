const express = require("express");
const router = express.Router();
const passport = require("passport");
const favoritesController = require("../../controllers/favorites/favoritesController");
const auth = passport.authenticate("jwt", { session: false });

router.post("/recipes/:id/favorite", auth, favoritesController.addToFavorites);

module.exports = router;
