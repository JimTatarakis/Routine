// Dependencies
// =============================================================
// Sets up the Models
// =============================================================
var db = require("../models");

// Task Routes
// =============================================================
module.exports = function(app) {
  // GET route : tasks
  app.get("/api/tasks", function(req, res) {
    db.Task.findAll({}).then(function(res) {
      res.json(res);
    });
  });

  // GET route : tasks not completed
  app.get("/api/tasks/notcompleted", function(req, res) {
    db.Task.findAll({ where: { completed: false } }).then(function(res) {
      res.json(res);
    });
  });

  // POST route : add task
  app.post("/api/tasks", function(req, res) {
    db.Task.create({
      name: req.body.name,
      completed: false
    }).then(function(res) {
      res.json(res);
    });
  });

  // DELETE route
  app.delete("/api/tasks/completed", function(req, res) {
    db.Task.destroy({
      where: {
        completed: true
      }
    }).then(function(res) {
      res.json({ delete: true });
    });
  });

  // PUT route
  app.put("/api/tasks", function(req, res) {
    db.Task.update(
      {
        completed: req.body.completed
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(res) {
      console.log("this is working!");
      res.json({ update: true });
    });
  });
};

// Manager View Routes
// =============================================================
