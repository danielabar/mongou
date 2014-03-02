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
      if (err) return next(err);

      if (!post) return next(); // 404

      res.render('post/read.jade', { post: post});
    });
  });

  // delete
  app.get('/post/remove/:id', loggedIn, function(req, res, next) {
    var id = req.param('id');

    BlogPost.findOne({ _id: id}, function(err, post) {
      if (err) return next(err);

      // validate logged in user authored this post
      if (post.author != req.session.user) {
        return res.send(403);
      }

      post.remove(function(err) {
        if (err) return next(err);

        // TODO display a confirmation msg to user
        res.redirect('/');
      });

    });
  });

  // update
  // app.get('/post/edit/:id', loggedIn, function(req, res, next) {
  //   // using express-mongoose that allows passing a mongoose promise to template rendering engine
  //   res.render('post/create.jade', {
  //     post: BlogPost.findById(req.param('id'))
  //   });
  // });

  app.get('/post/edit/:id', loggedIn, function(req, res, next) {
    var id = req.param('id');
    BlogPost.findOne({ _id: id}, function(err, post) {
      if (err) return next(err);
      console.log('putting post in create as edit view: ' + JSON.stringify(post, null, 2));
      res.render('post/create.jade', {post: post});
    });
  });

  app.post('/post/edit/:id', loggedIn, function(req, res, next) {
    // 'edit' is custom functionality defined in schema
    BlogPost.edit(req, function(err) {
      if (err) return next(err);
      res.redirect('/post/' + req.param('id'));
    });
  });

};