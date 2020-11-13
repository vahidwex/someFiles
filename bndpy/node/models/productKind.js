const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");

let Schema =new  mongoose.Schema({
    fatherProductKind: { type: mongoose.Schema.Types.ObjectId, ref: "ProductKind" },
    logo : {  type : String,required:true},
    title : { type : String,required : true},
    tags :{ type : String,required : true},
    description  :{type : String,required:true},

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

module.exports =   mongoose.model('ProductKind', Schema);