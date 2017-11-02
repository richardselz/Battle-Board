// Users Controller
var sdb = require("../models");
var exports = module.exports = {};

// POST of user is handled by Passport

exports.all = function(req, res) {
    sdb.User.findAll({})
        .then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        })
};
