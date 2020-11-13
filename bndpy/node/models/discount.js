const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");

let Schema = new mongoose.Schema({
    
    
    code:{ type: String, require: true },
    used:{ type: Boolean, require: true },
    percent:{ type: Number, require: true },
    // expiritionDate:{ type: Date, require: true },
  
});

module.exports = mongoose.model("Discount", Schema);
