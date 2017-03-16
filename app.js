var express    = require('express'),
    app        = express(),
    routes     = require('./app/routes/index.js');

// Handle requests
app.set('view engine', 'pug');
app.use('/public', express.static(process.cwd() + '/public'));
routes(app);

// Start server
var port = process.env.PORT || 8080;
app.listen(port, function(){
   console.log('The server is listening on port ' + port); 
});