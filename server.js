var express = require('express');
var bodyParser = require('body-parser');
var Passport = require('passport');
var NameAndPassword = require('passport-local');

var app = express();

// Configure to serve static files
app.use(express.static(__dirname + '/public'));

// Configure to parse the request body in the express 4.0 way
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(Passport.initialize());

Passport.use(new NameAndPassword(
	function(username, password, done) {
		if(username=='nathan'&&password=='hanna'){
			return done(null,{username:username,password:password,loggedIn:true},{message:'logged in'});
		}else{
			return done('wrong credentials',false,{message:'wrong credentials -> username: '+username+' password: '+password});
		}



		// User.findOne({ username: username }, function(err, user) {
		//   if (err) { return done(err); }
		//   if (!user) {
		//     return done(null, false, { message: 'Incorrect username.' });
		//   }
		//   if (!user.validPassword(password)) {
		//     return done(null, false, { message: 'Incorrect password.' });
		//   }
		//   return done(null, user);
		// });
	}
));





// app.post('/login',function(req,res){
// 	console.log(req.body);
// 	Passport.authenticate('local', { successRedirect: '#/goals',
//                                    failureRedirect: '#/login',
//                                    failureFlash: true });

// 	res.send(req.body);
// });

app.post('/login', function(req, res, next) {
  Passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});

app.listen(3000);