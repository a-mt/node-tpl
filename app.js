require('dotenv').load(); // load .env variables

var express    = require('express'),
    app        = express(),
    routes     = require('./app/routes/index.js');

//---------------------------------------------------------

// Auth
var passport = require('passport');
require('./app/auth/passport')(passport);

var session   = require('express-session'),
    SqlStore  = require('connect-session-sequelize')(session.Store),
    store     = new SqlStore({
        db                     : require('db'),
        checkExpirationInterval: 30 * 60 * 1000, // cleanup expired sessions every 30 min
        expiration             : 24 * 60 * 60 * 1000  // duration of a valid session 24 h
    });
store.sync();

app.use(session({
    secret: 'ce0c04361d',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 24 * 60 * 60 * 1000}, // 1 day
    store: store
}));

app.use(passport.initialize());
app.use(passport.session());

// Handle requests
app.use(require('connect-flash')());
app.use(require('body-parser').urlencoded({extended: false}));

app.locals.env = process.env;

app.use(function(req, res, next){
    res.locals.user    = req.user;
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