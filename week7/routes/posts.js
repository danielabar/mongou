var loggedIn = require('../middleware/loggedIn');
var mongoose = require('mongoose');
var BlogPost = mongoose.model('BlogPost');
var Comment = mongoose.model('Comment');

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
    var id = req.param('id');

    // findComments is a custom method
    // calling exec without passing callback means this will return a promise
    // mongoose is compatible with A+ promise spec
    var promise = BlogPost.findComments(id)
      .sort('created')
      .select('_id') // special mongoose syntax to exclude properties
      .exec();

    var query = BlogPost.findById(id).populate('author');
    query.exec(function(err, post) {
      if (err) return next(err);
      if (!post) return next(); // 404
      // pass the comments promise to view engine,
      // express view will wait until promise is resolved before rendering view
      res.render('post/read.jade', { post: post, comments: promise});
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

  // comments
  app.post('/post/comment/:id', loggedIn, function(req, res, next) {
    var id = req.param('id');
    var text = req.param('text');
    var author = req.session.user;

    Comment.create({
      post: id,
      text: text,
      author: author
    }, function(err, commnent) {
      if (err) return next(err);

      // TODO probably want to do this all with xhr, rather than refresh the whole page
      res.redirect('/post/' + id);
    });
  });

};