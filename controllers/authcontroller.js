
var db = require("../models");
var exports = module.exports = {}


exports.index = function (req, res) {
    res.render("index");
};

exports.login = function (req, res) {
    var error = req.flash("error")[0];
    if(error) {
        res.render("login", {Errors: error});
    } else {
        res.render("login");
    }

};

exports.register = function (req, res) {
    res.render("register");
};

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

    
exports.manager = function (req, res) {
    db.Task.findAll().then(data => {
        var manager = req.body.name;
        res.render('manager', {Tasks: data, Managers: manager});
    }) 
};





exports.user = function (req, res) {
    db.Task.findAll().then(data => {
        console.log(req.user.displayName);
        var user = req.user.displayName;
        res.render('user', {Tasks: data, Users: user});
    }) 
};



exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}


 