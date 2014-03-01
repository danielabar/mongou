var express = require('express');

module.exports = function(app) {
  console.log('middleware is being registered');

  app.use(express.logger('dev'));

  // this is good enough for now, but you'll want to use
  // connect-mongo or similar for persistent sessions
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'building a blog' }));

  // tell express to automatically parse incoming form requests
  app.use(express.bodyParser());

  // Custom middleware: expose ssession to views
  app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
  });
};