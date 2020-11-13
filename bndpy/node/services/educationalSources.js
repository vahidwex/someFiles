const mongoose = require("mongoose");
const db = require("../config/db");
const EducationalSources = db.EducationalSources;

module.exports = {
  getAll,
  getById,
  getEducationalSourcesByProductId,
  addEducationalSources,
  removeEducationalSources,
  editEducationalSources,
  addProductIntoES,
  removeFromProducts
};

async function getAll() {
  return await EducationalSources.find();
}
//-------------------------------------------------------------------------------
async function getById(id) {
  return await EducationalSources.find({_id : id});
}
// @param id is product id
async function getEducationalSourcesByProductId(id) {
  return await EducationalSources.find({product : id});
}
//-------------------------------------------------------------------------------
async function addEducationalSources(
    body,
    iconFilePath,
    filePath,
    userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  let educationalSources = new EducationalSources({
        icon: iconFilePath,
        file: filePath,
        fileType: body.fileType,
        title: body.title,
        desc: body.desc,
        modifiedLog
  });

  try {
    let es=await educationalSources.save();
    return educationalSources;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function removeEducationalSources(id) {
  try {
    let result=await EducationalSources.findOneAndRemove(
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
async function editEducationalSources(educationalSourcesId,body,iconFilePath,filePath,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
 
  try {
    let result=await EducationalSources.findOneAndUpdate(
      {
        _id: educationalSourcesId 
      } ,
      {
        $set: {
            icon: iconFilePath,
            file: filePath,
            fileType: body.fileType,
            title: body.title,
            desc: body.desc
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
// ------------------------------------------------------------------------------------------------

async function addProductIntoES(educationalSourcesId,product,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
 
  try {
    let result=await EducationalSources.findOneAndUpdate(
      {
        _id: educationalSourcesId 
      } ,
      {
        $push: {product},
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

// --------------------------------------------------------------
async function removeFromProducts(esId,productid,userId) {
  let modifiedLog = { date: new Date(), userId: userId };

  try {
    let result=await EducationalSources.findByIdAndUpdate(
      {
        _id: esId
      },{ 
        $pull: { product:  productid  },
        addToSet :{modifiedLog}
       });

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