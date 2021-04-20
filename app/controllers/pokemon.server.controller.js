// var Pokemon = require("mongoose").model("Pokemon");
const { json } = require("body-parser");
const fs = require("fs");
const path = require("path");

const pokeIds = {
  gen1: Array.from([...Array(151).keys()], x => x + 1),
  gen2: Array.from([...Array(100).keys()], x => x + 152),
  gen3: Array.from([...Array(135).keys()], x => x + 252),
  gen4: Array.from([...Array(107).keys()], x => x + 387),
  gen5: Array.from([...Array(156).keys()], x => x + 494),
  gen6: Array.from([...Array(72).keys()], x => x + 650),
  gen7: Array.from([...Array(88).keys()], x => x + 722),
  gen8: Array.from([...Array(88).keys()], x => x + 810)
}


module.exports.getPokemon = function(req, res, next) {
  if (!req.params.gens) {
    var err = new Error(
      "No gens specified"
    );
    next(err);
  }

  const gensList = req.params.gens.split('&')
  let chosenIds = []
  for (const gen of gensList) {
    chosenIds = chosenIds.concat(pokeIds[gen])
  }

  const pokeId = chosenIds[Math.floor(Math.random() * chosenIds.length)];
  console.log('pokeId:', pokeId)

  let rawdata = fs.readFileSync(
    path.resolve(__dirname + "/../../dataprocessing/pokemon.json")
  );
  let pokemon = JSON.parse(rawdata);
  let thisPoke = pokemon[pokeId];


  res.status(200).send(
    JSON.stringify({
      pokenames: thisPoke["pokenames"],
      filenames: {
        filename: "obf/" + thisPoke["filenames"]['filename'],
        filename1: "obf/" + thisPoke["filenames"]["filename1"],
        filename2: "obf/" + thisPoke["filenames"]["filename2"],
        filename3: "obf/" + thisPoke["filenames"]["filename3"],
        filename4: "obf/" + thisPoke["filenames"]["filename4"],
        filename5: "obf/" + thisPoke["filenames"]["filename5"],
        filename6: "obf/" + thisPoke["filenames"]["filename6"],
        filename7: "obf/" + thisPoke["filenames"]["filename7"],
        filename8: "obf/" + thisPoke["filenames"]["filename8"],
      },
    })
  );
};
