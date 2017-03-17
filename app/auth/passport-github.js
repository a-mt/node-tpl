'use strict';
var User           = require('../models/user/github');
var GitHubStrategy = require('passport-github').Strategy;

module.exports = function (passport) {

    if(!process.env.GITHUB_KEY) {
        throw new Error('The environment variable GITHUB_KEY isn\'t set');
    }
    if(!process.env.GITHUB_SECRET) {
        throw new Error('The environment variable GITHUB_SECRET isn\'t set');
    }
    if(!process.env.APP_URL) {
        throw new Error('The environment variable APP_URL isn\'t set');
    }

	passport.use(new GitHubStrategy(
	    {
    		clientID    : process.env.GITHUB_KEY,
    		clientSecret: process.env.GITHUB_SECRET,
    		callbackURL : process.env.APP_URL + 'auth/github/callback'
    	},
    	function (token, refreshToken, profile, done) {
    	  process.nextTick(function () { // Fire User.findOne when we have all our data back

			User.findOne({ 'github_id': profile.id }, function (err, user) {
				if (err) {
				    return done(err);
				}

                //If the user is found then log them in
				if (user) {
					return done(null, user);

                // If not, create it
				} else {
				    user = new User({
				        username   : profile.username,
				        github_id  : profile.id
					});
					user.save(function (err) {
						if (err) throw err;
						return done(null, user);
					});
				}
			});

    	  });
    	}
    ));
};