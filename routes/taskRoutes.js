// Dependencies
// =============================================================
// Sets up the Models
// =============================================================
var db = require("../models");

// Task Routes
// =============================================================
module.exports = (app) => {
    // GET route : find all tasks
    app.get("/api/tasks", function (req, res) {
        db.Task.findAll({}).then(function (answer) {
            res.json(answer);
        });
    });

    // POST route : add task
    app.post("/api/tasks", function (req, res) {
        db.Task.create({
            name: req.body.name,
            completed: false,
            description: req.body.description
        }).then(function (answer) {
            res.json(answer);
        });
    });

    // PUT route: Assign User to Task by id
    app.put("/api/tasks/assign/:id", function (req, res) {
        db.Task.update(
            {
                // this references the selected person
                UserId: req.body.UserId
            },
            {
                // this references the selected task
                where: {
                    id: req.params.id
                }
            }
        ).then(function (data) {
            console.log("this is working!");
            res.json({ taskAssigned: true });
        }).catch(function (err) {
            res.json(err);;
        });
    });

    // PUT route : mark task complete
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
        ).then((data) => {
            console.log("this is working!");
            res.json(data);
        }).catch(function (err) {
            res.json(err);;
        });
    });

    // DELETE route : task by id
    app.delete("/api/tasks/:id", function (req, res) {
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


};

