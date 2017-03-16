var BasicHandler = require(process.cwd() + '/app/controllers/basic.js');

module.exports = function (app) {

    // homepage
    app.get('/', BasicHandler.index);
};