const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");
 


let Schema = new mongoose.Schema({
  title: { type: String, require: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: false },
  modifiedLog: [
    {
      date: { type: String, required: true },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    }
  ]
});

module.exports =   mongoose.model("Banners",Schema);