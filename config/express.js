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
//   app.use("/img", (req, res, next) => {
//     var options = {
//       // Alt: process.cwd
//       root: path.resolve(__dirname + "/../static"),
//     };

//     // Alt: image streaming
//     res.sendFile("pikachu_test.png", options, (err) => {
//       if (err) next(err);
//       else console.log("Sent: pikachu");
//     });
//     next();

//     // app.get('/report/:chart_id/:user_id',(req, res) => {
//     //     const r = fs.createReadStream('path to file') // or any other way to get a readable stream
//     //     const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
//     //     stream.pipeline(
//     //      r,
//     //      ps, // <---- this makes a trick with stream error handling
//     //      (err) => {
//     //       if (err) {
//     //         console.log(err) // No such file or any other kind of error
//     //         return res.sendStatus(400);
//     //       }
//     //     })
//     //     ps.pipe(res) // <---- this makes a trick with stream error handling
//     //   })
//   });

  return app;
};
