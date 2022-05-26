var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
	host	:	'us-cdbr-east-05.cleardb.net',
	user	:	'bf1982a622010c',
	password: '6d1891e9',
	database :	'heroku_f5e2540d48ca1cc'
});

app.get("/", function(req, res) {
	// Find count of users in Database
	var q = "SELECT COUNT(*) AS count FROM users";
	connection.query(q, function(err, results) {
		if (err) throw err;
		var count = results[0].count;
		// res.send("We have " + count + " users in our db");
		res.render("home", {data: count});
	});
});

app.post('/register', function(req,res){
	var person = {
		email: req.body.email 
	};
	
	connection.query('INSERT INTO users SET ?', person, function(err, result) {
		if (err) throw err;
		res.redirect('/');
	}); 
});



app.get('/joke', function(req,res) {
	var joke="Knock knock joke";
	res.send(joke);
});

app.get('/random_num', function(req,res) {
	var num = Math.floor(Math.random() * 10) + 1;
	res.send('Your lucky number is ' + num);
});

app.listen(3000, function() {
	console.log('App listening on port 3000!');
});