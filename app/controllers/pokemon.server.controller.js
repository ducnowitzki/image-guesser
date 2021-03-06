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

  let rawdata = fs.readFileSync(
    path.resolve(__dirname + "/../../dataprocessing/pokemon.json")
  );
  let pokemon = JSON.parse(rawdata);
  let thisPoke = pokemon[req.params.pokeid];

  const filename = req.params.obf == 9 ? 'filename' : 'filename' + req.params.obf

  res.status(200).send(
    JSON.stringify({
      pokenames: thisPoke["pokenames"],
      filename: "obf/" + thisPoke["filenames"][filename],
    })
  );
};
