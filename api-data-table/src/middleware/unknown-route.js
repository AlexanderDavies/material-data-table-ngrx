exports.handleUnknownRoute = (req, res, next) => {
  return res.status(404).json({
    message: "resource does not exist"
  });
};
