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
    res.render("manager");
};

exports.user = function (req, res) {
    res.render("user");
};

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}