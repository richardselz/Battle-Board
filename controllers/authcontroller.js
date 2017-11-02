var sdb = require("../models");
var exports = module.exports = {}

exports.user = function(req, res) {
    // CAN PASS MORE THAN ONE OBJECT THROUGH RENDER
    // console.log("AuthCont USER: ",res.locals.user.username);
    if(!res.locals.user) {
        res.json({"status":"4xx","message":"User is not logged in!"});
    }else if(res) {
        res.json(res.locals.user.username);
    }
    
}

// Logout function!
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.json("hello");
    });
}