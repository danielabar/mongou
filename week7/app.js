var mongoose = require('mongoose');
var express = require('express');

// When passing directory name to require,
// node will look for index.js file in this directory,
// and load it. i.e. index.js is the default module
var routes = require('./routes');

mongoose.connect('mongodb://localhost', function(err) {

  if (err) throw err;

  console.log('connected');

  var app = express();
  routes(app);

  app.listen(3000, function() {
    console.log('now listening on http://locahost:3000');
  });

});