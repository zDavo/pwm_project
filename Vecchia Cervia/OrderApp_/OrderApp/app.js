var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var hbs = require('express-hbs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var argon2 = require('argon2');
var db = require('./models/db');
var { v4: uuidv4 } = require('uuid');

var indexRouter = require('./routes/index');
var menuRouter = require('./routes/menu');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var orderRouter = require('./routes/order');

var app = express();

// view engine setup
app.engine('hbs', hbs.express4());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(session({
  genid: uuidv4,
  secret: 'cvxbhfxdmdy,hdju6g768o80m',
  resave: false,
  saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/html')));
app.use(express.static(path.join(__dirname, 'public/javascripts')));
app.use(express.static(path.join(__dirname, 'public/stylesheets')));
app.use(passport.initialize());
app.use(passport.session());



app.use('/', indexRouter);
app.use('/menu', menuRouter);
app.use('/login', loginRouter);
app.use('/order', loginRouter);
app.use('/register', registerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password'
},
function(username, password, cb) {
    db.User.findOne({
    	attributes: ['firstName', 'lastName', 'password', 'email'],
        where: {
            email: username
        },
        raw : true
    }).then(function(user){
        if (!user) { return cb(null, false); }
        argon2.verify(user.password, password).then(function(status){
        	console.log(status);
        	if(status)
        		return cb(null, user);
        	return cb(null, false);
        });
        

    }).catch(function(error){

    	console.log(error);
        if (error) { return cb(null, error); }
    });
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.email);
});

passport.deserializeUser(function(username, cb) {
    db.User.findOne({
        attributes: ['firstName', 'lastName', 'email'],
        where: {
            email: username
        },
        raw : true
    }).then(function(user) {
        cb(null, user);
    });
});

module.exports = app;
