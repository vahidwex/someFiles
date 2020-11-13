const mongoose = require("mongoose");
const db = require("../config/db");
const CapabilityKind = db.CapabilityKind;

module.exports = {
  getAll,
  getById,
  create,
  remove,
  edit
};

async function getAll() {
  return await CapabilityKind.find();
}
//-------------------------------------------------------------------------------
async function create(body,filePath,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  let capabilityKind = new CapabilityKind({
    logo: filePath,
    title: body.title,
    tags: body.tags,
    modifiedLog
  });

  try {
    await capabilityKind.save();
    return capabilityKind;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function remove(id) {
  try {
    let result =await CapabilityKind.findOneAndRemove(
      {
        _id: id
      }  );

      if (!result) {
        return {
          Error: "Record not found"
        };
      }
  
      return {
        result,
        Message: "Record is deleted"
      };
    } catch (e) {
      return { "errorr is :": e };
    }
}
//-------------------------------------------------------------------------------
async function edit(body,capabilityKindId,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  try {
    let result=await CapabilityKind.findOneAndUpdate(
      {
        _id: capabilityKindId 
      } ,
      {
        $set: {
          "logo" : body.logo,
          "title" : body.title,
          "tags" : body.tags,
        
        },
        $addToSet :{
          modifiedLog
        }
      } );

      if (!result) {
        return {
          Error: "Record not found"
        };
      }
  
      return {
        result,
        Message: "Record is updated"
      };
    } catch (e) {
      return { "errorr is :": e };
    }
}
//-------------------------------------------------------------------------------
async function getById(id) {
  return await CapabilityKind.find({_id : id});
}
//-------------------------------------------------------------------------------

