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
    require: true
  },
  titleEnglish: {
    type: String,
    require: true,
    unique: true
  },
  shortDesc: {
    type: String,
    require: true
  },
  LongDesc: {
    type: String,
    require: true
  },
  technologies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Technology"
  }],
  banners: [{
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      require: true
    },
    desc: {
      type: String,
      require: true
    }
  }],
  advantages: [{
    icon: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      require: true
    },
    desc: {
      type: String,
      require: true
    }
  }],
  features: [{
    icon: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      require: true
    },
    desc: {
      type: String,
      require: true
    },
    featureKind: {
      type: String,
      required: true
    }
  }],
  like: {
    type: Number,
    require: true
  },
  bazdid: {
    type: Number,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  offPrice: {
    type: Number,
    require: true
  },
  sellCount: {
    type: Number,
    require: true
  },
  productKind: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductKind"
  }],
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
module.exports = mongoose.model('Product', Schema);