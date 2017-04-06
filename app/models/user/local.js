'use strict';

var sequelize = require('db'),
    ORM       = sequelize.ORM,
    bcrypt    = require('bcrypt');

// Password hashing
var SALT_WORK_FACTOR = 10;

var hashPassword = function(user, options, next) {
    if (!user._changed.password) {
        return next();
    }

    // Generate salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // Hash the password
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next(null, user);
        });
    });
};

var LocalUser = sequelize.define('user', {
    provider: { type: ORM.STRING, defaultValue: 'local' },
    username: {
        type: ORM.STRING,
        trim: true,
        lowercase: true,
        unique: true,
        defaultValue: '',
        validate: {
            notEmpty:  { msg: 'The field "username" is required' }
        }
    },
    password: {
        type: ORM.STRING,
        trim: true,
        defaultValue: '',
        validate: {
            notEmpty:  { msg: 'The field "description" is required' },
            len: { args: 3, msg: 'The password must be at least 3 characters long' }
        }
    },
    ref_id: {
        type: ORM.STRING,
        defaultValue: ''
    }
}, {
    hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
    },
    instanceMethods: {

        // Check password match
        verifyPassword: function(password) {
            var shouldBe = this.password;
            return new Promise(function(resolve, reject) {
                bcrypt.compare(password, shouldBe, function(err, isMatch) {
                    if (err) return reject(err);
                    if (!isMatch) return reject(new Error('Passwords do not match'));
                    resolve();
                });
            });
        }
    }
});
LocalUser.sync(); // create the table if it doesn't exist

module.exports = LocalUser;