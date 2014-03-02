var mongoose = require('mongoose');
var express = require('express');

// models
var user = require('./models/user');
var blogpost = require('./models/blogpost');

var middleware = require('./middleware');

// When passing directory name to require,
// node will look for index.js file in this directory,
// and load it. i.e. index.js is the default module
var routes = require('./routes');

mongoose.connect('mongodb://localhost/week7blog', function(err) {

  if (err) throw err;

  console.log('connected');

  var app = express();
  middleware(app);
  routes(app);

  app.listen(3000, function() {
    console.log('now listening on http://locahost:3000');
  });

});