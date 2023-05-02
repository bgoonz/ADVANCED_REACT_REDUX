const authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

// the {session: false} argument is to tell passport to not create a cookie based session for this request.
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });
function router(app) {
  app.get("/", requireAuth, function (req, res) {
    res.send({ hi: "there" });
  } );
    //here requireSignin is middleware that will run before the authentication.signin route handler
  app.post("/signin", requireSignin, authentication.signin);
  app.post("/signup", authentication.signup);
}

module.exports = router;
