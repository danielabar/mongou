var mongoose = require('mongoose');
require('./comment');

// define the schema
var schema = mongoose.Schema({
  title: { type: String, trim: true},
  created: { type: Date, default: Date.now},
  body: String,
  author: { type: String, ref: 'User'}
});

// create a query for comments with a blogpost _id matching `id`
// callback is optional,
//  if no callback is passed, statement is returned, i.e. query object that is created
//  if callback is passed, query is executed and promise is returned
// This is same behaviour that mongoose built in methods support
schema.statics.findComments = function(id, callback) {
  return this.model('Comment').find({ post: id}, callback);
};

schema.statics.edit = function (req, callback) {
  var id = req.param('id');
  var author = req.session.user;

  // validate current user authored this blogpost
  var query = { _id: id, author: author};

  var update = {};
  update.title = req.param('title');
  update.body = req.param('body');

  // within a static function, 'this' refers to model itself
  this.update(query, update, function(err, numAffected) {
    if (err) return callback(err);

    if (0 === numAffected) {
      return callback(new Error('no post to modify'));
    }
    console.log('Successfully updated blogpost, numAffected = ' + numAffected);
    callback();
  });
};

// when new blogposts are created, use lifecycle plugin to tweet
var lifecycle = require('mongoose-lifecycle');
schema.plugin(lifecycle);

// compile the model
var Post = mongoose.model('BlogPost', schema);

// handle events
Post.on('afterInsert', function(post) {
  // fake tweet this
  var url = 'http://localhost:3000/posts/';
  console.log('Read my new blog post! %s%s', url, post.id);
});

// NOTE: This logic is NOT in the route because that would get messy
//  if there's more than one place from which blog posts can be deleted
// clean up comments - this is needed because we chose to model Comments
//  as a separate collection from the blog posts
Post.on('afterRemove', function(post) {
  this.model('Comment').remove({ post: post._id}).exec(function(err) {
    if (err) {
      console.error('had trouble cleaning up old comments', err.stack);
    }
  });
});