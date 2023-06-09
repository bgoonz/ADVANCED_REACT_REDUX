const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

// define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

//on save hook, encrypt password
// before saving a model, run this function
userSchema.pre("save", function (next) {
  // get access to the user model
  const user = this;
  // generate a salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }
      // overwrite plain text password with encrypted password
      user.password = hash;
      // go ahead and save the model
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  // this.password is the hashed and salted password
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

// create the model class (represents all users)
const ModelClass = mongoose.model("user", userSchema);

module.exports = ModelClass;
