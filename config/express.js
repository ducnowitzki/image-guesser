var express = require("express");
var path = require("path");

module.exports = function() {
  const dir_path = path.resolve(__dirname, "..", "static")

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

  app.get('/', function (req,res) {
    console.log(dir_path)
    res.sendFile(dir_path + "/dist/index.html");
  });

  var pokemonMiddleware = require('../app/routes/pokemon.server.routes.js')
  pokemonMiddleware(app);

  return app;
};
