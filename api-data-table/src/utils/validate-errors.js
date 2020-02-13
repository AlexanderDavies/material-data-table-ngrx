const validator = require("express-validator");

//validate the request body for errors added by the express validator middleware
exports.validateErrors = req => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error();
    error.status = 422;
    error.message = errors.array()[0];
    throw error;
  }

  return true;

};
