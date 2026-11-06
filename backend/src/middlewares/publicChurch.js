// backend/src/middlewares/publicChurch.js
const publicChurch = (req, res, next) => {
  req.churchId = req.params.churchId;
  next();
};

module.exports = publicChurch;
