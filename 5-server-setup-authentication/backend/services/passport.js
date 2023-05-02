const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// set up options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

// create local strategy (for signing in)
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function (
  email,
  password,
  done
) {
  // verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false

  User.findOne({ email: email })
    .then(function (user) {
      if (!user) {
        return done(null, false);
      }

      // compare passwords - is `password`...(supplied by request) equal to user.password?
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return done(err);
        }
        //if there is no error but we did not find a user match
        if (!isMatch) {
          return done(null, false);
        }
        //sucess... no error and we found a user match
        return done(null, user);
      });
    })
    .catch(function (err) {});
});

// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // see if the user ID in the payload exists in our database
  // if it does, call 'done' with that user
  // otherwise, call done without a user object

  User.findById(payload.sub)
    .then(function (user) {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(function (err) {
      return done(err, false);
    });
});

// tell passport to use this strategy
passport.use( jwtLogin );
passport.use( localLogin );
