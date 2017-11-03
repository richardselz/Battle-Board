const authController = require("../controllers/authcontroller.js");
const boardsController = require("../controllers/boards_controller.js");
const charactersController = require("../controllers/characters_controller.js");
const gamesController = require("../controllers/games_controller.js");
const usersController = require("../controllers/users_controller.js");

module.exports = function(app, passport) {
    // User Routes
    app.get("/users/all", usersController.all);

    // Character Routes
    app.post("/characters/create", charactersController.create);
    app.post("/characters/user", charactersController.user);
    app.get("/characters/all", charactersController.all);
    app.post("/characters/update", charactersController.update);
    app.post("/characters/delete", charactersController.delete);
    app.post("/characters/createMonster", charactersController.createMonster);

    // Game Routes
    app.post("/games/create", gamesController.create);
    app.get("/games/all", gamesController.all);
    app.post("/games/update", gamesController.update);
    app.post("/games/delete", gamesController.delete);
    app.post("/games/resetturn", gamesController.resetturn);
    app.post("/games/updateround", gamesController.updateround);
    app.post("/games/updateturn", gamesController.updateturn);
    app.post("/games/roundcheck", gamesController.roundcheck);

    // Board Routes
    app.post("/boards/create", boardsController.create);
    app.get("/boards/all", boardsController.all);
    app.post("/boards/characters", boardsController.characters);
    app.post("/boards/delete", boardsController.delete);
    app.post("/boards/deletechar", boardsController.deletechar);

    // Passport Routes
    app.post("/signup", passport.authenticate('local-signup'), function(req, res) {
        res.json(req.user.dataValues.username);
    });

    app.post("/signin", passport.authenticate('local-signin'), function(req, res) {
        res.json(res.locals.user);
    });

    app.get("/signup", usersController.all);

    // AuthController Routes
    app.get("/auth/logout", authController.logout);
    app.get("/auth/userid", authController.user);

    // Send every request to the React app
    // Define any API routes before this runs

    

    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()) return next();
        res.json(req.user.dataValues.username);
    }
}