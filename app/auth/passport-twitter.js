'use strict';
var User            = require('../models/user/twitter');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function (passport) {

    if(!process.env.TWITTER_KEY) {
        throw new Error('The environment variable TWITTER_KEY isn\'t set');
    }
    if(!process.env.TWITTER_SECRET) {
        throw new Error('The environment variable TWITTER_SECRET isn\'t set');
    }
    if(!process.env.APP_URL) {
        throw new Error('The environment variable APP_URL isn\'t set');
    }

    passport.use(new TwitterStrategy(
        {
            consumerKey    : process.env.TWITTER_KEY,
            consumerSecret : process.env.TWITTER_SECRET,
            callbackURL    : process.env.APP_URL + 'auth/twitter/callback'
        },
        function (token, refreshToken, profile, done) {
          process.nextTick(function () { // Fire User.findOne when we have all our data back

            User.findOne({ where: {
                'ref_id'  : profile.id,
                'provider': 'twitter'
            } }).then(function(user) {

                //If the user is found then log them in
                if (user) {
                    return done(null, user);

                // If not, create it
                } else {
                    user = User.build({
                        username : profile.username,
                        ref_id   : profile.id
                    });
                    user.save().then(function() {
                        return done(null, user);
                    }).catch(function(err){
                        return done(err);
                    });
                }
            }).catch(function(err) {
                done(err);
            });

          });
        }
    ));
};