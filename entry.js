/*
*******************************************************
* entry.js
*
* Author: Raadad Elsleiman
*
* Entrypoint for node-workout-robot web application
*******************************************************
*/

var Sequelize = require("sequelize");  // This is popular ORM library
var express = require('express')  // a minimalstic web application framework
var app = express();  // creates a new instance of Express

var sql = new Sequelize('workoutbot', 'vagruser' , 'devman'); //Creates a new instance that will allow access to our database


/* The definition of our Exercise model, which will be stored and retrieved from our database,
this Model will provide details of what exercises can be included into  a workout
*/

var ExerciseModel = sql.define('exercise',{
	name:Sequelize.STRING,
	time:Sequelize.INTEGER,
	part:Sequelize.STRING,
	id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
});


/* Will ramup the database on a fresh environment
*/
var init = function(){
	var chainer = new Sequelize.Utils.QueryChainer
	chainer
		.add(ExerciseModel.drop())
		.add(ExerciseModel.sync())
		.run()
		.success(function(){
			var chainer = new Sequelize.Utils.QueryChainer
			chainer
				.add(ExerciseModel.create({
						name: "Push Ups",
					    time: 4,
					    part: "Arms"
					}))
				.add(ExerciseModel.create({
						name: "Sit Ups",
					    time: 3,
					    part: "Abs"
					}))
				.add(ExerciseModel.create({
						name: "Chin Ups",
					    time: 20,
					    part: "Arms"
					}))
				.add(ExerciseModel.create({
						name: "Leg Raises",
					    time: 5,
					    part: "Abs"
					}))
				.add(ExerciseModel.create({
						name: "Lunges",
					    time: 6,
					    part: "Legs"
					}));
			;})
		.error(function(errors){console.log("Error ramping up the database:",errors);})
	};


/*
Express Web application configuration,
*/

app.configure(function (){
	app.set('views', __dirname+"/views");
	app.set('view engine','jade')  // our page is composed using the jade templating engine
	app.use(express.bodyParser());
	app.set("jsonp callback",true);

	app.get("/", function(req,res){res.render("index")} );
	app.get("/exercises/", function(req,res){
			//hits the database and grabs all records in the exercise table
			ExerciseModel.findAll().success(function(data){
				//writes the records wrapped in JSONP
				res.jsonp(data);
			});
		});
			//did not enup getting used in application however shows some more RESTfulness
	app.get("/exercises/:id" , function(req,res){
			ExerciseModel.find(req.params.id).success(function(data){
				res.jsonp(data);
			});
		});
	app.use(app.router);
	app.use("/" ,express.static(__dirname + '/public/')); //allows for serving of static files
});

if(process.argv[2] === "init"){
	init();
}
else if(process.argv[2] === "start"){
	app.listen(8082);
	console.log("Starting Server listening for http on port 8082");
}
else {
	console.log("Arguments are:");
	console.log("   init: creates and fires up the database with initial data");
	console.log("   start: starts the application server listening for http on port 3200");
}
