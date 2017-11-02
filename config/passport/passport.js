var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require("passport-local").Strategy;

    passport.serializeUser(function(user,done) {
        done(null, user);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id.id).then(function(user) {
            if(user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use("local-signup", new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        function(req, username, password, done) {
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
                if(user) {
                    return done(null,false);
                } else {
                    var userPassword = generateHash(password);
                    var data = {
                        username: username,
                        password: userPassword,
                        email: req.body.email
                    };
                    User.create(data).then(newUser => {
                        console.log("I am successful, but can't respond to axios",req.body.username) 
                        if(!newUser) {
                            return done(null, false);
                        }else if(newUser) {
                            console.log("NewUser: ",newUser.dataValues);
                            return done(null, newUser);
                        }
                    })
                    .catch(err => console.log(err));
                }
            });
        }
    ));

    passport.use("local-signin", new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        function(req, username, password, done) {
            var User = user;
            console.log("Username: ",username);
            console.log("Password: ",password);
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
                if(!user) {
                    return (null, false, {message: "username does not exist!"});
                }else if(!isValidPassword(user.password, password)) {
                    return done(null, false, {message: "Incorrect Password!"});
                };
                var userinfo = user.get();
                console.log("logged in");
                return done(null, userinfo);
            }).catch(function(err) {
                console.error("Error: ", err);
                return done(null, false, {message: "Something went wrong with your Signin"});
            });
        }
    ));
}