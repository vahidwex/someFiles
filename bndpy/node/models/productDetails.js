const mongoose = require("mongoose");
const validator = require("validator");

let Schema = new mongoose.Schema({
  productDetailsKind: { type: mongoose.Schema.Types.ObjectId, ref: "ProductDetailsKind" },
  desc: { type: String, require: true },    
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

module.exports = mongoose.model("ProductDetails", Schema);
