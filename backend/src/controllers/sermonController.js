const sermonService = require("../services/sermonService");

const handle = (serviceFn, label) => async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const data = await serviceFn(req.churchId, limit);

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(`Error fetching ${label}:`, error);

    if (error.name === "ResourceNotFoundException") {
      return res.status(404).json({
        success: false,
        message: "No data found for this church",
      });
    }

    if (error.name === "AccessDeniedException") {
      // IAM misconfiguration: log it, don't leak details to the client
      return res.status(500).json({
        success: false,
        message: `Failed to fetch ${label}`,
      });
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || `Failed to fetch ${label}`,
    });
  }
};

module.exports = {
  getLatestSermons: handle(sermonService.getLatestSermons, "latest sermons"),
  getLatestMusic: handle(sermonService.getLatestMusic, "latest music"),
};