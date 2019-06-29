var db = require("../models");
var authController = require("../controllers/authcontroller.js");

module.exports = function (app, passport) {
  // Load index page
  app.get("/", authController.index);

  app.get("/login", authController.login);

  app.get("/user", isLoggedIn, authController.user);

  app.get("/manager", isLoggedIn, authController.manager);

  app.get("/register", isLoggedIn, authController.register);

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/login');
  }

};
