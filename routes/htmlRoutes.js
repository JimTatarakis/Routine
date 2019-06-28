var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/login", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("login", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/user", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("user", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/manager", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("manager", {
        msg: "Welcome, Manager!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  // app.get("/user", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.render("user", {
  //       example: dbExample
  //     });
  //   });
  // });

  // app.get("/manager", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
