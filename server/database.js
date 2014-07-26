console.log('database.js was loaded');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	// console.log(db);
	console.log('Connected to MongoDB Database.');
});

var userSchema = new mongoose.Schema({				// define columns
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	goals:[
		{
			title: String,
			description: String,
			completed: Boolean
		}
	]
});

// var goalSchema = new mongoose.Schema({
// 	title: String,
// 	description: String,
// 	user: 
// });
var User = mongoose.model('User',userSchema);	// create table
var test = new User({
	username:'admin',
	password:'admin',
	firstName:'Nathan',
	lastName:'Hanna',
	goals:[
		{
			title:'Goal1',
			description:'nuff said',
			completed:'false'
		},
		{
			title:'Goal2',
			description:'nuff said',
			completed:'false'
		},
		{
			title:'Goal3',
			description:'nuff said',
			completed:'false'
		}

	]
});
test.save();
module.exports = User;