var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/photoshare', function(err, db) {
  if (err) throw err;
  console.log('Connected to photoshare');

  var images = db.collection('images');
  var imageCursor = images.find({});
  // imageCursor.limit(50);

  imageCursor.each(function(err, image) {
    if (err) throw err;
    if (image !== null) {
      var albums = db.collection('albums');
      var albumQuery = {'images' : image._id};
      albums.count(albumQuery, function(err, albumCount) {
        if (err) throw err;
        if (albumCount === 0) {
          images.remove({_id:image._id}, function(err, numberOfRemovedDocs) {
            if (err) throw err;
            console.log('image not in any album: ' + image._id);
            console.log('numberOfRemovedDocs: ' + numberOfRemovedDocs);
          });
        }
      });
    } // end image processing
  }); // end imageCursor
}); // end connect