const mongoose = require("mongoose");
const db = require("../config/db");
const ProductKind = db.ProductKind;

module.exports = {
  getAll,
  create,
  remove,
  getById,
  edit,
  getByName
};


async function getAll() {
  return await ProductKind.find();
}
//-------------------------------------------------------------------------------
async function getById(id) {
  return await ProductKind.find({_id : id});
}

async function getByName(name) {
  return await ProductKind.find({title : name});
}
//-------------------------------------------------------------------------------
async function create(body,filepath,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  let prodKind = new ProductKind({
    fatherProductKind:body.fatherProductKind,
    logo: filepath,
    title: body.title,
    tags: body.tags,
    description:body.description,
    modifiedLog
  });

  try {
    await prodKind.save();
    return prodKind;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function remove(id) {
  try {
    let result=await ProductKind.findOneAndRemove(
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
    let result =await ProductKind.findOneAndUpdate(
      {
        _id: capabilityKindId 
      } ,
      {
        $set: {
          "fatherProductKind":body.fatherProductKind,
          "logo" :body.logo,
          "title" : body.title,
          "tags" : body.tags,
          "description":body.description,
        },
        $addToSet:{
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

