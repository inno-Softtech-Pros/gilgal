const express = require("express");
const router = express.Router();

const publicChurch = require("../middlewares/publicChurch");
const sermonController = require("../controllers/sermonController");

router.get("/:churchId/latest", publicChurch, sermonController.getLatestSermons);
router.get("/:churchId/music/latest", publicChurch, sermonController.getLatestMusic);

module.exports = router;