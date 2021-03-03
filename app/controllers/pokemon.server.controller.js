// var Pokemon = require("mongoose").model("Pokemon");
const { json } = require("body-parser");
const fs = require("fs");
const path = require("path");

module.exports.getPokemon = function(req, res, next) {
  if (!req.params.pokeid || !req.params.obf) {
    var err = new Error(
      "No pokemon id or obfuscation level specified in path!"
    );
    next(err);
  }

  console.log("poke id:", req.params.pokeid, "obf lvl:", req.params.obf);

  let rawdata = fs.readFileSync(path.resolve(__dirname + "/../../scripts/pokemon.json"));
  let pokemon = JSON.parse(rawdata)
  let thisPoke = pokemon[req.params.pokeid];
  
  res.status(200).send(JSON.stringify({
    name_en: thisPoke['name_en'],
    name_de: thisPoke['name_de'],
    filename: thisPoke['filename' + req.params.obf]
  }));

  
};
