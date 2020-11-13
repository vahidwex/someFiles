const mongoose = require("mongoose");
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const prodService = require("./productService");


const UiUsers = db.UiUsers;

module.exports = {
    create,
    checkByUserPass,
    checkByToken,
    verifyToken,
    insertLike,
    likedCheck
};
async function create(body) {
    let uiUsers = new UiUsers({
      user:body.user,
      pass:body.pass,
    });
  
    try {
      await uiUsers.save();
      const Uzer=await uiUsers.addToken();
      return {
            Uzer,
            success:true
        };
    } catch (e) {

      return {
          e,
          success:false
        };
    }
}

async function checkByUserPass(body) {
    let result = await UiUsers.findOne({
        user: body.user,
        pass: body.pass
      });
      if(!result){
        return {
            success:false,
            Error: "Record not found"
          };
      }
      return {
        success:true,
        result,
        Message: "Record founded"
      };
}
async function verifyToken(token) {
    let decoded;
  
    try {
      decoded = JWT.verify(token, process.env.SECRET_KEY);
      return Promise.resolve(decoded);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  
async function checkByToken(body) {
    let decoded = await verifyToken(body.token);
    let result =await UiUsers.findOne({
        _id: decoded.id,
        "tokens.token": body.token
    });


  if(!result){
        return {
            success:false,
            Error: "Record not found"
          };
      }
      return {
        success:true,
        result,
        Message: "Record founded"
      };
    
}
async function insertLike(body) {
  let decoded = await verifyToken(body.token);
  let result =await UiUsers.findOneAndUpdate(
    {
      _id:decoded.id
    },
    
    {
      $addToSet:{
        likes:body.productId
      },
    },{new:true}
    );


if(!result){
    return {
        success:false,
        Error: "Record not found"
      };
  }
  let prod=await prodService.increaseLike(body.productId);
  return {
        success:true,
        result,
        prod,
        Message: "Record updated"
  };

}
async function likedCheck(body) {
  if(body.customtoken){
    
    let decoded = await verifyToken(body.customtoken);
    let result =await UiUsers.find({
      _id:decoded.id,
      likes:body.productId
    });

    if(!result.length){
      return {
          success:false,
          Error: "Record not found"
        };
    }
    return {
          success:true,
          result,
          Message: "Record updated"
    };
  }else{
    return {
      success:false,
      Error: "Record not found"
    };
  }




}
