// Boards Controller
var sdb = require("../models");
var exports = module.exports = {};

// Post route to insert into the board table
// POST to /boards/create
exports.create = function(req, res) {
    // add item to board table
    console.log("req.body.charInfo is", req.body.charInfo);
    const newBody = req.body.charInfo.map((char) => {
        return {
            game_id: req.body.gameID,
            character_id: char.character_id,
            UserId: res.locals.user.id
        }
    });

    sdb.Board.bulkCreate(newBody)
    console.log("I'm goint to add to the board with a newBody of", newBody);
    db.Board.bulkCreate(newBody)
        // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            res.json(data);
        }).catch(function(err) {
            console.log("Error in Bulk Create",err);
            res.json(err);
        });
};

exports.all = function(req, res) {
    sdb.Board.findAll({})
        .then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
};

exports.characters = function(req, res) {
    console.log("Boards Characters req.body.gameID: ",req.body.gameID);
    let sqlQuery = "SELECT * FROM characters WHERE character_id IN (SELECT character_id FROM boards WHERE game_id = ";
    sqlQuery += req.body.gameID;
    sqlQuery += ")";
    sdb.sequelize.query(sqlQuery)
        .then(function(data){
            res.json(data);})
        .catch(function(err) {
            res.json(err);
        });
};

exports.update = function(req, res) {
    console.log("in boards_controllers, gameID is", req.body.game_id);
    console.log("rest of body is", req.body);
    const newBody = req.body.charList.map((char) => {
        return {
            game_id: req.body.game_id,
            character_id: char.character_id,
            UserId: res.locals.user.id
        }
    });
    console.log("newBody is", newBody);
    db.Board.destroy({
        where: {
            game_id: req.body.game_id
        }
    }).then(function() {
        sdb.Board.bulkCreate(newBody)
        // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            res.json(data);
        });
    }).catch(function(err) {
        res.json(err);
    });
};

exports.delete = function(req, res) {
    sdb.Board.destroy({
        where: {
            game_id: req.body.game_id
        }
    }).then(function(data) {
        res.json(data);
    }).catch(function(err) {
        res.json(err);
    });
};

exports.deletechar = function(req, res) {
    sdb.Board.destroy({
        where: {
            character_id: req.body.character_id
        }
    }).then(function(data) {
        res.json(data);
    }).catch(function(err) {
        res.json(err);
    });
};