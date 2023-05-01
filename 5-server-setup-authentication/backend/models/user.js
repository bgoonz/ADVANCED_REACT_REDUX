const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

// define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

//on save hook, encrypt password

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// create the model class (represents all users)
const ModelClass = mongoose.model("user", userSchema);

module.exports = ModelClass;
