const mongoose = require("mongoose");
const validator = require("validator");

let Schema = new mongoose.Schema({
  title: { type: String, require: true },
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

module.exports = mongoose.model("ProductDetailsKind", Schema);
