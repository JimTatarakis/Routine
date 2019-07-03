// Dependencies
// =============================================================
// Sets up the Models
// =============================================================
var db = require("../models");

// Task Routes
// =============================================================
module.exports = function (app) {
  // GET route : tasks
  app.get("/api/tasks", function (req, res) {
    db.Task.findAll({}).then(function (answer) {
      res.json(answer);
    });
  });

  // GET route : tasks not completed
  app.get("/api/tasks/notcompleted", function (req, res) {
    db.Task.findAll({ where: { completed: false } }).then(function (answer) {
      res.json(answer);
    });
  });

  // POST route : add task
  app.post("/api/tasks", function (req, res) {
    db.Task.create({
      name: req.body.name,
      description: req.body.description,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }).then(function (answer) {
      res.json(answer);
    });
  });

  // POST route : add User
  app.post("/api/register", function (req, res) {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      email: req.body.email,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
      .then(function (answer) {
        var message = "User Created. Please Login";
        res.render("login", { Message: message });
      })
      .catch(function (err) {
        console.log(err);

      });
  });

  // DELETE route
  app.delete("/api/tasks/delete/:id", function (req, res) {
    db.Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.json({ delete: true });
    }).catch(function (err) {
      res.json(err);;
    });
  });
  // PUT route
  app.put("/api/tasks/:id", function (req, res) {
    db.Task.update(
      {
        completed: true
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(function (data) {
        console.log("this is working!");
        res.json(data);
      }).catch(function (err) {
        res.json(err);
      });
  });
}

// Manager View Routes
// =============================================================
