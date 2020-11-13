"use strict";

var mongoose = require("mongoose");

var validator = require("validator");

var _ = require("lodash");

var Schema = new mongoose.Schema({
  logo: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  modifiedLog: [{
    date: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  }]
});
module.exports = mongoose.model('ProductKind', Schema);