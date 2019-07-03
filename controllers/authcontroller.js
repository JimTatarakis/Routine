
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

exports.manager = function (req, res) {
    let user = req.user.displayName;
    db.User.findAll().then(data1 => {
        db.Task.findAll().then(data2 => {
            res.render('manager', {User: data1, Tasks: data2, Users: user})
        })
    })
};


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
