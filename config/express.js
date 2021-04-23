var express = require("express");
var path = require("path");

module.exports = function() {
  var corsProxy = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  };

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
  app.use(corsProxy);
  app.use(logger);
  app.use(express.static("static"));

  var pokemonMiddleware = require('../app/routes/pokemon.server.routes.js')
  pokemonMiddleware(app);

  return app;
};
