const authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

// the {session: false} argument is to tell passport to not create a cookie based session for this request.
const requireAuth = passport.authenticate("jwt", { session: false });

function router(app) {
  app.get("/", requireAuth, function (req, res) {
    res.send({ hi: "there" });
  });
  app.post("/signup", authentication.signup);
}

module.exports = router;
