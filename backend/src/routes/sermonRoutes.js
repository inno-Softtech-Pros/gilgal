const express = require("express");
const router = express.Router();

const publicChurch = require("../middlewares/publicChurch");
const sermonController = require("../controllers/sermonController");

router.get("/latest", publicChurch, sermonController.getLatestSermons);
router.get("/music/latest", publicChurch, sermonController.getLatestMusic);

module.exports = router;