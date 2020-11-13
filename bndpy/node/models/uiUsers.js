const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const tokenOptions = {
    type: String,
    required: true
  };
let Schema = new mongoose.Schema({
    
    
    user:{ type: String, require: true,minlength: 10 , trim: true,unique:true},
    pass: { type: String, required: true, minlength: 6, trim: true },
    tokens: [{ token: tokenOptions }] ,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }] 

    
  
});

Schema.methods.addToken = async function () {
    let UiUser=this;

    let token = JWT.sign(
        { id: UiUser._id.toHexString() },
        process.env.SECRET_KEY
    );

    UiUser.tokens.push({
        token
    });

    await UiUser.save();

    return UiUser;
}

module.exports = mongoose.model("UiUsers", Schema);
