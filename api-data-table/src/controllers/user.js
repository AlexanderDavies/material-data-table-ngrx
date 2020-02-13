const userService = require("../services/user");
const validateErrorsUtil = require("../utils/validate-errors");

exports.createUser = async (req, res, next) => {
  try {
    //ensure middleware checks were valid
    validateErrorsUtil.validateErrors(req);

    //call the service to create a user
    const { email, firstName, surname, role } = req.body;
    const user = await userService.createUser({
      email: email,
      firstName: firstName,
      surname: surname,
      role: role
    });

    return res.status(200).json({
      message: "user created",
      user: user
    });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    //ensure middleware checks were valid
    validateErrorsUtil.validateErrors(req);

    //get users
    const users = await userService.getUsers(req.query);

    //get the count of users
    const userCount = await userService.getUserCount();

    return res.status(200).json({
      users: users,
      userCount: userCount
    });
  } catch (err) {
    next(err);
  }
};
