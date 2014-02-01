var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
	if (err) throw err;

	var query = {
		'title': {
			'$regex': 'Microsoft'
		}
	};

	var projection = {
		'title': 1,
		'created_utc' : 1,
		'_id': 0
	};

	db.collection('reddit').find(query, projection).each(function(err, doc) {
		if (err) throw err;

		if (doc == null) {
			return db.close();
		}
		var createdDate = new Date(0);
		createdDate.setUTCSeconds(doc.created_utc);
		console.dir(doc.title);
		console.dir(createdDate);
	});
});