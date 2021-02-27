var express = require("express");

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

  return app;
};
