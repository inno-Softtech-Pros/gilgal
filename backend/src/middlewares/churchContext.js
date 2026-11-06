// backend/src/middlewares/churchContext.js
const churchContext = (req, res, next) => {
  req.churchId = process.env.CHURCH_ID;
  next();
};

module.exports = churchContext;
