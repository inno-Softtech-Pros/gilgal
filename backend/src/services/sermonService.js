const sermonRepository = require("../repositories/sermonRepository");

const validateLimit = (limit) => {
  const parsedLimit = Number(limit);

  if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
    const error = new Error("Limit must be a positive integer");
    error.statusCode = 400;
    throw error;
  }

  return parsedLimit;
};

const getLatestSermons = async (churchId, limit = 5) =>
  sermonRepository.getLatestSermons(churchId, validateLimit(limit));

const getLatestMusic = async (churchId, limit = 5) =>
  sermonRepository.getLatestMusic(churchId, validateLimit(limit));

module.exports = { getLatestSermons, getLatestMusic };