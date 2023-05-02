const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// set up options for JWT strategy
const jwtOptions = {};

// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // see if the user ID in the payload exists in our database
  // if it does, call 'done' with that user
  // otherwise, call done without a user object

  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      // if user is found, call done without an error(null) and with that user as a second argument.
      done(null, user);
    } else {
        //if there was no error but a user was not found.
      done(null, false);
    }
  });
});
