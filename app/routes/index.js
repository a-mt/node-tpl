var basicHandler   = require(process.cwd() + '/app/controllers/basic.js'),
    exempleHandler = require(process.cwd() + '/app/controllers/exemple.js');

module.exports = function(app) {

    // login / logout
    require('./auth')(app);

    // homepage
    app.get('/', basicHandler.index);

    // exemple
    app.route('/exemple/new')
       .get(exempleHandler.add)
       .post(exempleHandler.addSubmit);

    app.get('/exemple', exempleHandler.list);

    app.route(/^\/exemple\/edit\/([a-z0-9]+)/)
       .get(exempleHandler.edit)
       .post(exempleHandler.editSubmit);
};