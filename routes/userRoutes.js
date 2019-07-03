// Dependencies
// =============================================================
// Sets up the Models
// =============================================================
var db = require("../models");

// User Routes
// =============================================================
module.exports = (app) => {
  // GET route : find all users
  app.get("/api/users/all", function (req, res) {
    db.User.findAll({}).then(function (answer) {
      res.json(answer);
    });
  });

  // GET route : find user with id and associated tasks
  app.get("/api/users/:id", function (req, res) {
    db.User.findAll({
      where: { id: req.params.id },
      include: [db.Task]
    })
      .then(function (answer) {
        res.json(answer);
      });
  });

  // POST route : add User
  app.post("/api/users/register", function (req, res) {
    if (req.body.secret === "cats") {
      db.User.create({
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName,
        email: req.body.email,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        manager: true
      })
        .then(function (answer) {
          var message = "Manager Created. Please Login";
          res.render("login", { Message: message });
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      db.User.create({
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName,
        email: req.body.email,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        manager: false
      })
        .then(function (answer) {
          var message = "User Created. Please Login";
          res.render("login", { Message: message });
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  });

  // POST route : add User from Manager screen
  app.post("/api/users/register2", function (req, res) {
    if (req.body.secret === "cats") {
      db.User.create({
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName,
        email: req.body.email,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        manager: true
      })
        .then(function () {
          var message = "Manager Created. Please Login";
          res.render("login", { Message: message });
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      db.User.create({
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName,
        email: req.body.email,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        manager: false
      })
        .then(function () {
          var message = "User Created. Please Login";
          res.render("login", { Message: message });
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  });

  // DELETE route : user delete
  app.delete("/api/users/:id", function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.json({ delete: true });
    }).catch(function (err) {
      res.json(err);
    });
  });


};