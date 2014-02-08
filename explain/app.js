var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
	if (err) throw err;

	var cursor = db.collection('coll').find({'x':2});
	cursor.explain(function(err, explain_output) {
		console.log(explain_output);
		db.close();
	});

});