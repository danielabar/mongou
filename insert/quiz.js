var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
	if (err) throw err;

	var docs = [{
		'_id': 'George',
		'age': 6
	}, {
		'_id': 'george',
		'age': 7
	}];

	db.collection('students').insert(docs, function(err, inserted) {
		if (err) throw err;

		console.dir("Successfully inserted: " + JSON.stringify(inserted));

		return db.close();
	});
});