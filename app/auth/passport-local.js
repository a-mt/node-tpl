'use strict';
var User          = require('../models/user/local');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

    // Login using username + password
    passport.use(new LocalStrategy(function(username, password, done) {

        // Find user with the given username
        User.findOne({ where: { username: username } }).then(function(user) {

            // Err user doesn't exist
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            // Verify password
            user.verifyPassword(password).then(function() {
                return done(null, user);
            }).catch(function(){
                return done(null, false, { message: 'Incorrect password.' });
            });

        }).catch(function(err){
            return done(err);
        });
      }
    )); // end LocalStrategy
};