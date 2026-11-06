// backend/src/controllers/calendarController.js
const calendarService = require("../services/calendarService");

const getEventById = async (req, res, next) => {
  try {
    const event = await calendarService.getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.json({ success: true, event });
  } catch (err) {
    next(err);
  }
};

const getEvents = async (req, res, next) => {
  try {
    const { startDate, endDate, status, limit, lastEvaluatedKey } = req.query;
    const result = await calendarService.getEvents({
      startDate,
      endDate,
      status,
      limit: limit ? parseInt(limit) : undefined,
      lastEvaluatedKey: lastEvaluatedKey ? JSON.parse(lastEvaluatedKey) : undefined
    });
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

const getUpcomingEvents = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const result = await calendarService.getUpcomingEvents(limit);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getEventById, getEvents, getUpcomingEvents };
