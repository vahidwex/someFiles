const mongoose = require("mongoose");
const db = require("../config/db");
const Banner = db.Banner;

module.exports = {
  getAll,
  getById,
  create,
  remove,
  edit
};

async function getAll() {
 const banner=  await Banner.find();
 return banner;
}
//-------------------------------------------------------------------------------
async function getById(id) {
  return await Banner.find({_id : id});
}
//-------------------------------------------------------------------------------
async function create(body,filepath,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  let banner = new Banner({
    image : filepath,
    title: body.title,
    description:body.description,
    link:body.link,
    modifiedLog
  });

  try {
    await banner.save();
    return banner;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function remove(id) {
  try {
    let result=await Banner.findOneAndRemove(
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
        Message: "Record is updated"
      };
    } catch (e) {
      return { "errorr is :": e };
    }
}
//-------------------------------------------------------------------------------
async function edit(body,bannerId,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
 
  try {
    let result=await Banner.findOneAndUpdate(
      {
        _id: bannerId 
      } ,
      {
        $set: {
          "image" : body.image,
          "title" : body.title,
          "description" : body.description,
          "link" :body.link 
        },
        addToSet :{
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


