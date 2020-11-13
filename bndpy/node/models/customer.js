const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");

let Schema = new mongoose.Schema({
  logo: { type: String, required: true },
  title: { type: String, required: true },
  tel: { type: String },
  site: { type: String },
  email: { type: String },
  manager: { type: String },
  productsBuyed: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }
  ],
  addresses: [
    {
      address: { type: String },
      posWidth: { type: String },
      posHeight: { type: String }
    }
  ],
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

module.exports =   mongoose.model('Customer', Schema);