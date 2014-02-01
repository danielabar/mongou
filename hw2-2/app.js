var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
	if (err) throw err;

	var weather = db.collection('data');
	// var projection = {
	// 	'State': 1,
	// 	'Temperature': 1,
	// 	'_id': 0
	// };
	var projection = {};
	var options = {
		'sort': [
			['State', 1],
			['Temperature', -1]
		]
	};
	var cursor = weather.find({}, projection, options);

	// "month_high" : true
	var previousState = null;
	cursor.each(function(err, doc) {
		if (err) throw err;
		if (doc == null) {
			console.log('============= end of collection reached, closing db');
			return db.close();
		} else {
			var currentState = doc['State'];
			if (currentState !== previousState) {
				previousState = currentState;
				// console.log('Changed previousState to: ' + previousState);
				// console.log('Current doc is: ' + JSON.stringify(doc));

				// Update this doc
				var updateQuery = { '_id' : doc['_id'] };
				// console.log('updateQuery: ' + JSON.stringify(updateQuery));
				var sort = [];
				var operator = { '$set' : { 'month_high' : true } };
				var options = { 'new' : true };
				db.collection('data').findAndModify(updateQuery, sort, operator, options, function(err, updatedDoc) {
					if(err) throw err;
					if (!doc) {
						console.log("not updated");
					} else {
						console.log("updated: " + JSON.stringify(doc, null, 2));
					}
				});
			}
		}
	});
});