const path = require("path");
require("dotenv").config({ path: __dirname });
let dotenv = require("dotenv");
const result = dotenv.config({ path: __dirname + "/.env" });

const mongoose = require("mongoose");
 

mongoose.connect(
  process.env.MONGODB_URI || null,
  { useCreateIndex: true, useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

module.exports = {
  
  Role: require("../models/role"),
  ProductDetails: require("../models/productDetails"),
  // ProductKindCategory: require("../models/productKindCategory"),

  ProductDetailsKind: require("../models/productDetailsKind"),
  Store: require("../models/stores"),
  UiUsers: require("../models/uiUsers"),
  Discount: require("../models/discount"),
  Order: require("../models/order"),
  Client: require("../models/client"),
  Transport: require("../models/transport"),
  User: require("../models/user"),
  Customer: require("../models/customer"),
  Banner: require("../models/banner"),
  Capability: require("../models/capability"),
  CapabilityKind: require("../models/capabilityKind"),
  Product: require("../models/product"),
  ProductKind: require("../models/productKind"),
  Setting: require("../models/setting"),
  EducationalSources: require("../models/educationalSources") 
};
