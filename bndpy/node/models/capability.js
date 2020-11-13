const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");

let Schema =new  mongoose.Schema({
    logo : {  type : String,required : true},
    title : { type : String,required : true},
    kind : { type: mongoose.Schema.Types.ObjectId, ref: "CapabilityKind", required: true },
    tags :{ type : String,required : true},
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

module.exports =   mongoose.model('Capability', Schema);