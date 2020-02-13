const { body, query } = require("express-validator");

const userService = require("../services/user");

//check that the req body contains the required fields and email does not already exist.
exports.createUser = [
  body("email")
    .exists()
    .isEmail()
    .withMessage("please enter a valid email")
    .custom(async (val, { req }) => {
      const user = await userService.getUser(val);
      if (user) {
        return Promise.reject("user already exists");
      }
    })
    .normalizeEmail(),
  body("firstName").exists(),
  body("surname").exists(),
  body("role").exists()
];

exports.getUsers = [
  query("sortColumn").exists(),
  query("sortDirection")
    .exists()
    .isIn(["asc", "desc"]),
  query("filter").exists(),
  query("pageSize").exists(),
  query("pageIndex").exists()
];
