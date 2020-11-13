const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");

let Schema = new mongoose.Schema({
  logo: { type: String, required: true },
  backGround: { type: String,required:true},

  companyName: { type: String, required: true },
  email: { type: String, required: true },
  tel :{type : String , required : true,default: '123 - 456 - 7890'},
  fax :{type : String , required : true},
  
  HeaderMessage:{type : String , required : true},
  // solutionHeader: {type : String , required : true},
  productHeader:  {type : String , required : true},
  // educationalSources: {type : String , required : true},
  // subeducationalSources: {type : String , required : true},
  // customers: {type : String , required : true},

  abutUsFooter:  {type : String ,required : true},
  abutUsPage:  {type : String ,required : true},


  // footerFirstCoumn:{type : String , required : true },
  // footersecoundColumn: {type : String , required : true},
  // footerthirdColumn: {type : String , required : true },
  location: {type : String , required : true},
  downFooterText: {type : String ,required : true},


  addresses: [
    {
      address: { type: String, required: true },
      positionWidth: { type: String, required: false },
      positionHeight: { type: String, required: false },        
    }
  ],
  socialNetworks: [
    {
      socialLogo: { type: String, required: true },
      title: { type: String, required: true },
      link: { type: String, required: false }
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

module.exports =   mongoose.model('Setting', Schema);