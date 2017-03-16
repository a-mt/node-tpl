var express    = require('express'),
    app        = express(),
    routes     = require('./app/routes/index.js');

//---------------------------------------------------------

require('dotenv').load(); // load .env variables

// Connect DB
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

// Handle requests
var session = require('express-session');
app.use(session({
    secret: 'ce0c04361d',
    resave: true,
    saveUninitialized: true
}));
app.use(require('connect-flash')());
app.use(require('body-parser').urlencoded({extended: false}));

app.use(function(req, res, next){
    res.locals.error   = req.flash('error').pop() || false;
    res.locals.success = req.flash('success').pop() || false;
    next();
});

//---------------------------------------------------------

// Handle requests
app.set('view engine', 'pug');
app.use('/public', express.static(process.cwd() + '/public'));
routes(app);

// Start server
var port = process.env.PORT || 8080;
app.listen(port, function(){
   console.log('The server is listening on port ' + port); 
});