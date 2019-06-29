require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("passport");
var Strategy = require("passport-local").Strategy;

var db = require("./models");

passport.use(
  new Strategy(function (username, password, done) {
    console.log("entering username to search: " + username);
    db.User.findOne({ where: { username: username } }).then(function(user) {
      console.log(user);
      console.log("searching for username");
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      else if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  console.log("Serialized!");
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  db.User.findOne({ where: { id: id } }).then(function(user) {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var session = require("express-session"),
  bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.post("/login", passport.authenticate("local", { failureRedirect: "/login" }),
function(req, res) {
  res.redirect("/user");
}
);

// Routes
require("./routes/managerRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
