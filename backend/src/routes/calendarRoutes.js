// backend/src/routes/calendarRoutes.js
const express = require("express");
const router = express.Router();

const churchContext = require("../middlewares/churchContext");
const calendarController = require("../controllers/calendarController");

router.get("/upcoming", churchContext, calendarController.getUpcomingEvents);
router.get("/:id", churchContext, calendarController.getEventById);
router.get("/", churchContext, calendarController.getEvents);

module.exports = router;
