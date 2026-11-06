// backend/src/routes/sermonRoutes.js
const express = require("express");
const router = express.Router();

const churchContext = require("../middlewares/churchContext");
const sermonController = require("../controllers/sermonController");

router.get("/latest", churchContext, sermonController.getLatestSermons);
router.get("/music/latest", churchContext, sermonController.getLatestMusic);

module.exports = router;
