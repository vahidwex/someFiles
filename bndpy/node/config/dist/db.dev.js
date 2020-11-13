"use strict";

var path = require("path");

require("dotenv").config({
  path: __dirname
});

var dotenv = require("dotenv");

var result = dotenv.config({
  path: __dirname + "/.env"
});

var mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || null, {
  useCreateIndex: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
module.exports = {
  Role: require("../models/role"),
  User: require("../models/user"),
  Customer: require("../models/customer"),
  Banner: require("../models/banner"),
  Capability: require("../models/capability"),
  CapabilityKind: require("../models/capabilityKind"),
  Solution: require("../models/solution"),
  SolutionKind: require("../models/solutionKind"),
  Product: require("../models/product"),
  ProductKind: require("../models/productKind"),
  Setting: require("../models/setting"),
  Technology: require("../models/technology"),
  TechnologyKind: require("../models/technologyKind"),
  FeatureKind: require("../models/featureKind"),
  EducationalSources: require("../models/educationalSources")
};