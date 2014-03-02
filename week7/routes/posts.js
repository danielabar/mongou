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

    // mongoose query builder - fluent interface
    var query = BlogPost.findById(req.param('id'));

    // runs additional query to get data from related collections
    // query.populate('author');

    query.exec(function(err, post) {
      if(err) return next(err);

      if(!post) return next(); // 404

      console.log('putting post in view: ' + JSON.stringify(post, null, 2));
      res.render('post/read.jade', { post: post});
    });
  });

  // read
  // app.get('/post/:id', function(req, res, next) {
  //   var postid = req.param('id');
  //   BlogPost.findById(postid, function(err, blogpost) {
  //     if(err) return next(err);
  //     if(!blogpost) {
  //       return res.redirect('/');
  //     }
  //     if(blogpost) {
  //       console.log('putting blogpost in view: ' + JSON.stringify(blogpost, null, 2));
  //       return res.render('post/read.jade', {post : blogpost});
  //     }
  //   });
  // });

};