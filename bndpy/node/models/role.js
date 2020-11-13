const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");

let Schema = new mongoose.Schema({
  title: { type: String, require: true },
  accesses: [
    {
      access: { type: String, required: true },
      isAuthorized: { type: Boolean, required: true }
    }
  ]
});

module.exports = mongoose.model("Role", Schema);
