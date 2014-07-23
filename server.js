var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var http = require('http');
var path = require('path');

var favicon			= require('serve-favicon');
var morgan			= require('morgan');
var cookieParser	= require('cookie-parser');
var methodOverride	= require('method-override');
var expressSession	= require('express-session');
var errorHandler	= require('errorhandler');

//==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === "admin" && password === "admin") // stupid example
      return done(null, {name: "admin"});

    return done(null, false, { message: 'Incorrect username.' });
  }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
	if (!req.isAuthenticated())
		res.send(401);
	else
		next();
};
//==================================================================
// Start express application
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/stopwatch_icon.png'));
// app.use(express.favicon());
app.use(morgan('dev')); 					// log every request to the console
// app.use(express.logger('dev'));
app.use(cookieParser());
// app.use(express.cookieParser());
app.use(bodyParser()); 						// pull information from html in POST
// app.use(express.bodyParser());
app.use(methodOverride()); 					// simulate DELETE and PUT
// app.use(express.methodOverride());
app.use(expressSession({ secret: 'securedsession' }));
// app.use(express.session({ secret: 'securedsession' }));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization
// app.use(app.router);						// it appears that express 4.x doesn't need this
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

//==================================================================
// routes
app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});

app.get('/users', auth, function(req, res){
  res.send([{name: "user1"}, {name: "user2"}]);
});
//==================================================================

//==================================================================
// route to test if the user is logged in or not
app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// route to log in
app.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

// route to log out
app.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});
//==================================================================

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



// var app = express();

// // Configure to serve static files
// app.use(express.static(__dirname + '/public'));

// // Configure to parse the request body in the express 4.0 way
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(Passport.initialize());

// app.post('/login', function(req, res, next) {
//   Passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err) }
//     if (!user) {
//       req.flash('error', info.message);
//       return res.redirect('/login')
//     }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });

// app.listen(3000);