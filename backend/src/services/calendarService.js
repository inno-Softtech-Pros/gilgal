// backend/src/services/calendarService.js
const calendarRepository = require("../repositories/calendarRepository");

const getEventById = async (id) => {
  return calendarRepository.getEventById(id);
};

const getEvents = async (options) => {
  return calendarRepository.getEvents(options);
};

const getUpcomingEvents = async (limit) => {
  return calendarRepository.getUpcomingEvents(limit);
};

module.exports = { getEventById, getEvents, getUpcomingEvents };
