
var db = require("../models");
var exports = module.exports = {}


exports.index = function (req, res) {
    res.render("index");
};

exports.login = function (req, res) {
    var error = req.flash("error")[0];
    if (error) {
        res.render("login", { Errors: error });
    } else {
        res.render("login");
    }

};

exports.register = function (req, res) {
    res.render("register");
};

<<<<<<< HEAD
=======
// exports.manager = function (req, res) {
//     db.Task.findAll().then(data => {
//         res.render('manager', {Tasks:data})
//       })
// };

// exports.user = function (req, res) {
//     db.Task.findAll().then(data => {
//         res.render('user', {Tasks:data})
//       })
// };

    
>>>>>>> 9e297e7b0ea868e5d157f572c1560e37e1defc93
exports.manager = function (req, res) {
    let user = req.user.displayName;
    db.User.findAll().then(data1 => {
        db.Task.findAll().then(data2 => {
            res.render('manager', {User: data1, Tasks: data2, Users: user})
        })
    })
};

<<<<<<< HEAD
=======



>>>>>>> 9e297e7b0ea868e5d157f572c1560e37e1defc93

exports.user = function (req, res) {
    db.Task.findAll().then(data => {
        console.log(req.user.displayName);
        var user = req.user.displayName;
        res.render('user', { Tasks: data, Users: user });
    })
};



exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}


