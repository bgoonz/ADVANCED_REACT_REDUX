const authentication = require("./controllers/authentication");

function router( app ) {
app.post("/signup", authentication.signup);
}

module.exports = router;
