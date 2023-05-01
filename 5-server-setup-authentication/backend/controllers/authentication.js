const User = require("../models/user");
exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // see if a user with the given email exists
    let existingUser;
    try {
        existingUser = await User.findOne( { email: email } );
    } catch ( err ) {
        return next( err );
    }

    // if a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    // if a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password,
    } );
    try{
       await user.save();
    } catch ( err ) {
        return next( err );
    }

};
