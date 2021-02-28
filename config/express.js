var express = require('express');
// var path = require('path');

module.exports = function() {
  var logger = function(req, res, next) {
    console.log(`
        - Method: ${req.method}
        - Path: ${JSON.stringify(req.path)}
        - Cookies: ${JSON.stringify(req.cookies)}
        - Query: ${JSON.stringify(req.query)}
    `);
    next();
  };

  var app = express();
  app.use(logger);
  app.use(express.static('static'));

  app.use('/img', (req, res, next) => {
      var options = {
          root: __dirname
      }
    res.sendFile('pikachu_test.png', options, (err) => {
        if (err) next(err);
        else console.log('Sent: pikachu');
    });
  })

  return app;
};
