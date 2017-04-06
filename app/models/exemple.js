'use strict';

var sequelize = require('db'),
    ORM       = sequelize.ORM;

// http://docs.sequelizejs.com/en/2.0/docs/models-definition/
var Exemple = sequelize.define('exemple', {
    name: {
        type: ORM.STRING,
        trim: true,
        unique: true,
        defaultValue: '',
        validate: {
            notEmpty:  { msg: 'The field "name" is required' }
        }
    },
    description: {
        type: ORM.STRING,
        defaultValue: '',
        validate: {
            notEmpty:  { msg: 'The field "description" is required' }
        }
    }
});
Exemple.sync(); // create the table if it doesn't exist

module.exports = Exemple;