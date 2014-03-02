var loggedIn = require('../middleware/loggedIn');
var mongoose = require('mongoose');
var BlogPost = mongoose.model('BlogPost');

module.exports = function(app) {

  // create
  app.get('/post/create', loggedIn, function(req, res) {
    res.render('post/create.jade');
  });

  app.post('/post/create', loggedIn, function(req, res, next) {
    var body = req.param('body');
    var title = req.param('title');
    var user = req.session.user;

    BlogPost.create({
      body: body,
      title: title,
      author: user
    }, function(err, post) {
      if(err) return next(err);
      console.log('created blog post with id: ' + post.id);
      res.redirect('/post/' + post.id);
    });
  });

  // read
  app.get('/post/:id', function(req, res, next) {
    var postid = req.param('id');
    BlogPost.findById(postid, function(err, blogpost) {
      if(err) return next(err);
      if(!blogpost) {
        return res.redirect('/');
      }
      if(blogpost) {
        return res.render('post/read.jade', {title : blogpost.title});
      }
    });
  });

};