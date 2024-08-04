const express = require("express");
const router = express.Router();
const passport = require("passport");
const favoritesController = require("../../controllers/favorites/favoritesController");
const auth = passport.authenticate("jwt", { session: false });

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Zarządzanie ulubionymi przepisami
 */

/**
 * @swagger
 * /api/favorites/{id}/favorite:
 *   post:
 *     summary: Dodaj przepis do ulubionych
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID przepisu
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Przepis dodany do ulubionych
 *       401:
 *         description: Brak autoryzacji
 *       500:
 *         description: Błąd serwera
 */
router.post("/:id/favorite", auth, favoritesController.addToFavorites);

/**
 * @swagger
 * /api/favorites/favorite:
 *   get:
 *     summary: Pobierz ulubione przepisy
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista ulubionych przepisów
 *       401:
 *         description: Brak autoryzacji
 *       500:
 *         description: Błąd serwera
 */
router.get("/favorite", auth, favoritesController.getFavorites);

/**
 * @swagger
 * /api/favorites/{id}/favorite:
 *   delete:
 *     summary: Usuń przepis z ulubionych
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID przepisu
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Przepis usunięty z ulubionych
 *       401:
 *         description: Brak autoryzacji
 *       500:
 *         description: Błąd serwera
 */
router.delete("/:id/favorite", auth, favoritesController.removeFromFavorites);
module.exports = router;
