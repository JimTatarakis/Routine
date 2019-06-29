var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/user", function(req, res) {
    db.Task.findAll().then(data => {
      res.render('user', {Tasks:data})
    })
  })
 

  app.get("/manager", function(req, res) {
    db.Task.findAll().then(data => {
      res.render('manager', {Tasks:data})
    })
  })
   

  app.get("/register", function(req, res) {
    res.render("register");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
