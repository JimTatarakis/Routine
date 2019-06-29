
var db = require("../models");
var exports = module.exports = {}



exports.index = function (req, res) {
    res.render("index");
};

exports.login = function (req, res) {
    res.render("login");
};

exports.register = function (req, res) {
    res.render("register");
};

exports.manager = function (req, res) {
    db.Task.findAll().then(data => {
        res.render('manager', {Tasks:data})
      })
};

exports.user = function (req, res) {
    db.Task.findAll().then(data => {
        res.render('user', {Tasks:data})
      })
};

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}


 