const publicChurch = (req, res, next) => {
  req.churchId = req.params.churchId;
  next();
};

module.exports = publicChurch;