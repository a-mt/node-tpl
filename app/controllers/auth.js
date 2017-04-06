'use strict';
var User      = require('../models/user/local'),
    sequelize = require('db');

function AuthHandler(){

    // Create a new account
    this.signup = function(req, res) {
        res.render('auth/signup', {
            title: 'Signup',
            errors: req.flash('errors').pop() || {},
            data: req.flash('data').pop() || {}
        });
    };
    this.addUser = function(req, res) {
        var params = req.body;
        var user   = User.build(params);

        // Save user
        user.save().catch(function(err){

            // Data validation of model failed
           var errors = sequelize.formatErr(err);

            // Render form with errors
            req.flash('errors', errors);
            req.flash('data', req.body);

            res.redirect('/signup');

        }).then(function(){
            req.login(user, function () {
                res.redirect('/');
            });
        });
    };

    // Login with an account
    this.signin = function(req, res) {
	    res.render('auth/signin', {
	        title: 'Login'
	    });
    };

    // Change password
    this.settings = function(req, res){
        res.render('auth/settings', {
            title: 'About me',
	        errors: req.flash("errors").pop() || {},
            data: req.flash('data').pop() || {}
        });
    };
    this.settingsSubmit = function(req, res){
        var user = req.user;

        // Check if given password matches current
        user.verifyPassword(req.body.password).then(function(){

            // Save changes
            user.password = req.body.newpassword;
            user.save().catch(function(err){

                // Data validation failed ?
                var errors = sequelize.formatErr(err);
                req.flash('errors', {
                    newpassword: errors.password
                });
                req.flash('data', req.body);
                res.redirect('/settings');

            }).then(function(){
                req.flash('success', 'Your password has been successfully updated');
                res.redirect('/settings');
            });
        }).catch(function(){

            // Render form with errors
            req.flash('errors', {
                password: {message: 'Incorrect password.'}
            });
            req.flash('data', req.body);
            res.redirect('/settings');
        });
    };
}

module.exports = new AuthHandler();