const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");

let Schema = new mongoose.Schema({

  title: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },

});

module.exports = mongoose.model("Transport", Schema);
