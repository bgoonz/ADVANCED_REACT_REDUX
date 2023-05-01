const User = require("../models/user");
exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // see if a user with the given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
  });
  // if a user with email does exist, return an error
  // if a user with email does NOT exist, create and save user record
  // respond to request indicating the user was created
};
