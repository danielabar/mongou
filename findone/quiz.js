var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db)
{
     if(err) throw err;

     var query = { 'grade' : 100};

     function callback(err, doc) {
          if(err) throw err;

          console.dir(doc);

          db.close();
     }
     /* TODO */
     db.collection('grades').findOne(query, callback);
});