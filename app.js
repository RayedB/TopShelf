var express = require('express');
var Ingredients = require('./models/ingredients.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/labelleassiette');

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
	res.sendFile(__dirname+"/public/index.html");
})

app.get('/inventory',function(req,res){
	Ingredients.find(function(err,ingr){
		res.json(ingr);
	})
})

app.post('/add', function(req,res){
	var entry = new Ingredients({name: req.body.name, quantity: req.body.quantity});
	var self = this;
	Ingredients.find({name:req.body.name}, function(err,data){
		if(data.length){
			res.send(500,"Ingredient exists!");
		}
		else{
			entry.save(function(err){
				if (err) {console.log(err);}
				else { console.log('Saved to db')}
			});
		res.redirect('/');
		}
	})
})

app.put('/ingredients/:name',function(req,res) {
	console.log(req.body);
	console.log(req.params);
/*	if (!req.params.name || !req.body.quantity){
		res.status(500).send("missing parameter");
	}
	else{*/
	Ingredients.findOneAndUpdate({name: req.params.name}, {quantity: req.body.quantity}, function(err){
		if (err) {console.log(err);}
		else {res.status(200).send("it worked")};
	})
	
})

app.delete('/ingredients/:name',function(req,res){
	console.log(req.params.name);
	Ingredients.findOneAndRemove({name: req.params.name},function(err){
		if (err) {console.log(err);}
		else {res.status(200).send("it worked")};
	})
})

app.listen(8080, function() {
	console.log("listening on port 8080!");
});