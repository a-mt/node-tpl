'use strict';

var Exemple = require('../models/exemple');

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
        var exemple = new Exemple(post);

        // Save it
        exemple.save(function(err, obj){

            // Data validation of model failed
           if(err) {
               var errors = err.errors || {};

               // Err duplicate ("name" is unique)
                if (err.name === 'MongoError' && err.code === 11000) {
                    errors.name = {
                        message: 'Exemple already exists'
                    };
                }
                // Render form with errors
                req.flash('errors', errors);
                req.flash('data', req.body);

                res.redirect('/exemple/new');
            } else {
                res.redirect('/exemple/edit/' + obj._id.toHexString());
            }
        });
    };

    // List existing Exemple
    this.list = function(req, res) {
        Exemple.find({}, function(err, docs){
            res.render('exemple/list', {
                title: 'Exemples',
                docs: err ? [] : docs
            });
        });  
    };

    // Edit an Exemple entity
    this.edit = function(req, res) {
        var id = req.params[0];
        Exemple.findById(id, function (err, exemple) {
            
            // Not found
            if(err) {
                req.flash('error', 'The required exemple doesn\'t exist');
                res.status(404).redirect('/exemple');
                return;
            }
            res.render('exemple/edit', {
                title: 'Exemple: ' + exemple.name,
                item: exemple,
                errors: req.flash('errors').pop() || {},
                data: req.flash('data').pop() || {}
            });
        });
    };
    this.editSubmit = function(req, res) {
        var id = req.params[0];
        Exemple.findById(id, function (err, exemple) {
            
            // Not found
            if(err) {
                req.flash('error', 'The required exemple doesn\'t exist');
                res.status(404).redirect('/exemple');
                return;
            }

            // Delete
            if(req.body.delete) {
                exemple.remove(function(){
                    req.flash('success', 'The exemple has been successfully deleted');
                    res.redirect('/exemple');
                });
                return;
            }

            exemple.description = req.body.description;
            exemple.save(function(err){
                if(err) {
                    req.flash('errors', err.errors);
                } else {
                    req.flash('success', 'The exemple has been successfully updated');
                }
                res.redirect('/exemple/edit/' + id);
            });
        });
    };
}

module.exports = new ExempleHandler();
