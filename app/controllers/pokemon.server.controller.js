
var Pokemon = require("mongoose").model("Pokemon");


// var multer = require("multer");
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
 
// var upload = multer({ storage: storage });

module.exports.getPokemonInstructions = function(req, res, next) {
  // Test uploading and retrieval of images
  // Set up multer for storing uploaded files
  //   res.status(200).send(JSON.stringify({ pika: "pikachu" }));
};

module.exports.getPokemonById = function(req, res, next, pokeid) {
  Pokemon.findOne({ id: pokeid }, function(err, pokemon) {
    if (err) return next(new Error("Failed to retrieve pokemon"));

    // check query parameter for obfuscation lvl

    res.json(pokemon);
  });
};

module.export.setPokemonWithId = function(req, res, next, pokeid) {
  // Test save of img
  Pokemon.create({
    id: pokeid,
    name: req.pokemon.name,
    img: {
      data: fs.readFileSync(
        path.join(path.resolve(__dirname + "/../../uploads/" + req.file.filename))
      ),
    },
  }, (err, item) => {
      if (err) console.log(err);
      next();
  });
};
