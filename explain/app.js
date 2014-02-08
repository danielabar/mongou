var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
	if (err) throw err;

	var query = {'x':2};
	var projection = {};
	var projection = {};
	// var options = { 'hint' : { '$natural' : 1 } };
	var options = { 'hint' : { '_id' : 1 } };
	var cursor = db.collection('coll').find(query, projection, options);
	cursor.explain(function(err, explain_output) {
		console.log(explain_output);
		db.close();
	});

});