const User = require("../models/user");
const escRegex = require('escape-regexp');

//service to create users in mongodb
exports.createUser = async ({email, firstName, surname, role}) => {
  try {
    const user = await new User({
      email: email,
      firstName: firstName,
      surname: surname,
      role: role
    });

    const savedUser = await user.save();

    return savedUser;
  } catch (err) {
    throw err;
  }
};

//service to getUsers in mongoDB with: filtering, sorting and pagination
exports.getUsers = async ({
  sortColumn = 1,
  sortDirection = 'asc',
  filter = "",
  pageSize = 10,
  pageIndex = 1
}) => {
  try {
    //set sort query object
    let sortQuery = {};
    const stype = sortColumn;
    const sdir = sortDirection;
    sortQuery[stype] = sdir;

    //set filter query object to search each field
    let filterQuery = {};
    if (filter !== "") {
      filterQuery = {
        $or: [
          { email: new RegExp("^" + escRegex(filter), "i") },
          { firstName: new RegExp("^" + filter, "i") },
          { surname: new RegExp("^" + filter, "i") },
          { role: new RegExp("^" + filter, "i") }
        ]
      };
    }

    //get users with filtering, sorting and pagination.
    const users = await User.find(filterQuery, null, {
      skip: parseInt(+pageSize) * (parseInt(+pageIndex) - 1),
      collation: { locale: "en" },
      sort: sortQuery,
      limit: parseInt(+pageSize)
    });

    return users;
  } catch (err) {
    throw err;
  }
};

exports.getUserCount = async () => {
  try {
    const userCount = await User.countDocuments();

    return userCount;
  } catch (err) {
    throw err;
  }
};

//service to get a single user based on email address
exports.getUser = async email => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (err) {
    throw err;
  }
};
