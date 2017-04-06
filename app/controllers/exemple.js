'use strict';

var Exemple   = require('../models/exemple'),
    sequelize = require('db');

function ExempleHandler(){

    // Add an Exemple entity
    this.add = function(req, res) {
        res.render('exemple/new', {
            title: 'Exemple',
            errors: req.flash('errors').pop() || {},
            data: req.flash('data').pop() || {}
        });
    };
    this.addSubmit = function(req, res) {
        var post    = req.body;
        var exemple = Exemple.build(post);

        // Save it
        exemple.save().then(function(obj){
            res.redirect('/exemple/edit/' + obj.id);
        }).catch(function(err) {

           // Data validation of model failed
           var errors = sequelize.formatErr(err);

            // Render form with errors
            req.flash('errors', errors);
            req.flash('data', req.body);

            res.redirect('/exemple/new');
        });
    };

    // List existing Exemple
    this.list = function(req, res) {
        Exemple.findAll().catch(function(err) {
            console.error(err);
            return [];
        }).then(function(docs){
            res.render('exemple/list', {
                title: 'Exemples',
                docs: docs
            });
        });  
    };

    // Edit an Exemple entity
    this.edit = function(req, res) {
        var id = req.params[0];
        Exemple.findById(id).then(function(exemple) {

            res.render('exemple/edit', {
                title: 'Exemple: ' + exemple.name,
                item: exemple,
                errors: req.flash('errors').pop() || {},
                data: req.flash('data').pop() || {}
            });
        }).catch(function() {

            // Not found
            req.flash('error', 'The required exemple doesn\'t exist');
            res.status(404).redirect('/exemple');
        });
    };
    this.editSubmit = function(req, res) {
        var id = req.params[0];
        Exemple.findById(id).then(function(exemple) {

            // Delete
            if(req.body.delete) {
                exemple.destroy({ force: true }).then(function(){
                    req.flash('success', 'The exemple has been successfully deleted');
                    res.redirect('/exemple');
                });
                return;
            }

            exemple.description = req.body.description;
            exemple.save().then(function(){
                req.flash('success', 'The exemple has been successfully updated');
                res.redirect('/exemple/edit/' + id);

            }).catch(function(err){
                req.flash('errors', err.errors);
                res.redirect('/exemple/edit/' + id);
            });
        }).catch(function(){

            // Not found
            req.flash('error', 'The required exemple doesn\'t exist');
            res.status(404).redirect('/exemple');
        });
    };
}

module.exports = new ExempleHandler();