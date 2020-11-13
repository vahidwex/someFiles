const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");

let Schema =new  mongoose.Schema({
    productKind: { type: mongoose.Schema.Types.ObjectId, ref: "ProductKind" ,required: true},
    logo : {  type : String,required:true},
    title : { type : String,required : true},
    banners: [
        {
          image: { type: String, required: true },
          title: { type: String, require: true },
          desc: { type: String, require: true }
        }
      ],
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

module.exports =   mongoose.model('Stores', Schema);