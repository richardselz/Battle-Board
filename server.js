const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session")

const PORT = process.env.PORT || 3001;
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);


// // logging for request to the console
// app.use(logger("dev"));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Set up Sequelize
const sdb = require("./models");
sdb.sequelize.sync().then(function() {
    console.log("Sequelize Connected!");
}).catch(function(err) {
    console.error("Something went wrong with Sequelize: ", err);
});

// Passport Sessions
app.use(session({secret: "somevaluablesecrets", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Middleware to have a global variable for userName (res.locals.user.user_name)
app.use(function(req, res, next) {
    res.locals.user = req.user;
    app.locals.user = req.user;
    if(!req.user){
        next();
    }else {
        next();
    }
  });

// Passports Requirements for Functionality
require("./routes/auth.js")(app, passport);
require("./config/passport/passport.js")(passport, sdb.User);


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// socket setup
io.on("connection", (client) => {
	console.log("I'm in io.on in the server.js file");
	console.log("Client.conn.id is", client.conn.id);
	client.on("message", (message) => {
        console.log("message from client", message);
        io.emit("message", message);
    });
    
    client.on("gameList", (message) => {
        console.log("message from client", message);
        io.emit("gameList", message);
	});
});

http.listen(PORT, function() {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});

module.exports = app;