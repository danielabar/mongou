var MongoClient = require('mongodb').MongoClient;
var _ = require('underscore');
var scoreHelper = require('./ScoreHelper');

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

    var students = db.collection('students');
    var cursor = students.find({});

    cursor.each(function(err, doc) {
      if(err) throw err;
      if(doc != null) {
        // var allScores = doc.scores;
        // var otherScores = _.filter(allScores, function(val){return val.type !== 'homework'});
        // var homeworkScores = _.where(allScores, { type: 'homework' });
        // var scoresLowestHomeworkDropped = _.rest(_.sortBy(homeworkScores, function(val){return val.score;}));
        // var scoresTogether = otherScores.concat(scoresLowestHomeworkDropped);
        var scoresTogether = scoreHelper.filterLowestHomework(doc.scores);
        var criteria = {_id : doc._id};
        var updateStatement = { $set : { scores : scoresTogether} };
        db.collection('students').update(criteria, updateStatement, function(err, modCount) {
        	if(err) throw err;
        	console.log('updated doc._id = ' + doc._id);
        });
      } else {
      	console.log('Closing db');
      	return db.close();
      }
    });
});

// MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
//     if(err) throw err;

//     var students = db.collection('students');
//     var cursor = students.find({});

//     cursor.each(function(err, doc) {
//         if(err) throw err;
//         if(doc != null) {
// 	        var allScores = doc.scores;
// 	        var otherScores = _.filter(allScores, function(val){return val.type !== 'homework'});
// 	        var homeworkScores = _.where(allScores, { type: 'homework' });
// 	        var scoresLowestHomeworkDropped = _.rest(_.sortBy(homeworkScores, function(val){return val.score;}));
// 	        var scoresTogether = otherScores.concat(scoresLowestHomeworkDropped);
// 	        var criteria = {_id : doc._id};
// 	        var updateStatement = { $set : { scores : scoresTogether} };
// 	        db.collection('students').update(criteria, updateStatement, function(err, modCount) {
// 	        	if(err) throw err;
// 	        	console.log('updated doc._id = ' + doc._id);
// 	        });
//         } else {
//         	console.log('Closing db');
//         	return db.close();
//         }
//     });
// });