var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
	if (err) throw err;

	var query = { 'Wind Direction' : { '$gt' : 180, '$lt' : 360 } };
	var projection = {
		'State': 1,
		'Temperature': 1,
		'Wind Direction' : 1,
		'_id': 0
	};
	var options = {
		'skip': 0,
		'limit': 1,
		'sort': [['Temperature', 1]]
	};

	db.collection('data').find(query, projection, options).each(function(err, doc) {
		if (err) throw err;

		if (doc == null) {
			return db.close();
		}

		console.dir(doc);
	});
});