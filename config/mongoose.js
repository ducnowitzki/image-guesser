var mongoose = require("mongoose");

var path = require("path");
require("dotenv/config");

module.exports = function() {
  var db = mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      console.log("connected");
    }
  );
  console.log("Established conecction to MongoDB");

  require("../app/models/pokemon.server.models.js");

  return db;
};
