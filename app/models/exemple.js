'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var Exemple = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'The field "name" is required']
    },
    description: {
        type: String,
        required: [true, 'The field "description" is required']
    }
});

module.exports = mongoose.model('Exemple', Exemple);