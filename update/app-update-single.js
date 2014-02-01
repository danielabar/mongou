var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    var query = { 'assignment' : 'hw1' };

    db.collection('grades').findOne(query, function(err, doc) {
        if(err) throw err;
        if(!doc) {
            console.log('No documents for assignment ' + query.assignment + ' found!');
            return db.close();
        }

        // make sure doc we got above is same we're about to update
        query['_id'] = doc['_id'];
        doc['date_returned'] = new Date();

        // doc is REPLACEMENT
        db.collection('grades').update(query, doc, function(err, updated) {
            if(err) throw err;

            console.dir("Successfully updated " + updated + " document!");

            return db.close();
        });
    });
});
