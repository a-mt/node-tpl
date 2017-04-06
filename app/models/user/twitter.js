'use strict';

var sequelize = require('db'),
    ORM       = sequelize.ORM,
    needSync  = !sequelize.models.user;

var TwitterUser = sequelize.define('user', {
    provider: { type: ORM.STRING, defaultValue: 'twitter' },
    username: {
        type: ORM.STRING,
        trim: true,
        defaultValue: '',
        validate: {
            notEmpty:  { msg: 'The field "username" is required' }
        }
    },
    ref_id: {
        type: ORM.STRING,
        defaultValue: '',
        validate: {
            notEmpty:  { msg: 'The field "id" is required' }
        }
    }
});
if(needSync) {
    TwitterUser.sync(); // create the table if it doesn't exist
}
module.exports = TwitterUser;