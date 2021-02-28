const express = require("express");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const app = express();

//app.set("view engine", "jade");

sharp("tai512x512.png")
  .resize(8, 8)
  .toFile("small.png")
  .then(() => {
    sharp("small.png")
      .resize(512, 512, { kernel: sharp.kernel.nearest })
      .toFile("bigagain.png");
  });
