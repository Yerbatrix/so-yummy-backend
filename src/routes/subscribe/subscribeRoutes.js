const express = require("express");
const router = express.Router();

const subscribeController = require("../../controllers/subscribe/subscribeController");

router.post("/", subscribeController.subscription);

module.exports = router;
