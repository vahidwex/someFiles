const mongoose = require("mongoose");
const validator = require("validator");

let Schema = new mongoose.Schema({
  logo: { type: Object, required: true },
  title: { type: String, required: true },
  tags: { type: String, required: true },
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

module.exports = mongoose.model("CapabilityKind", Schema);
