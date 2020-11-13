const mongoose = require("mongoose");
const db = require("../config/db");
const Store = db.Store;

module.exports = {
  getAll,
  create,
  remove,
  getById,
  edit,
  getByName,
  addStoreBanner,
  deletestoreBanner,
  editStoreBanner
};


async function getAll() {
  return await Store.find({});
}
//-------------------------------------------------------------------------------
async function getById(id) {
  return await Store.find({_id : id});
}

async function getByName(name) {
  return await Store.find({title : name});
}
//-------------------------------------------------------------------------------
async function create(body,filepath,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  let store = new Store({
    productDetailKind:body.productDetailKind,
    logo:filepath,
    title:body.title,
    // banners:{...body.banners},
    description:body.description,
    modifiedLog
  });

  try {
    await store.save();
    return store;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function remove(id) {
  try {
    let result=await Store.findOneAndRemove(
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
async function edit(body,storeId,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  try {
    let result =await Store.findOneAndUpdate(
      {
        _id: storeId 
      } ,
      {
        $set: {
          "productDetailKind":body.productDetailKind,
          "logo" :body.logo,
          "title" : body.title,
          // "banners" : {...body.banners,image:filepath},
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

async function addStoreBanner(body,storeId,filepath,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  
  try {
    let result =await Store.findOneAndUpdate(
      {
        _id: storeId 
      } ,
      {
        
        $addToSet:{
          modifiedLog,
          banners:{...body,image:filepath}
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


async function deletestoreBanner(bannerId,storeId,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  try {
    let result =await Store.findOneAndUpdate(
      {
        _id: storeId 
      } ,
      {
        $addToSet:{
          modifiedLog
        },
        $pull:{
          banners:{_id:bannerId}
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

async function editStoreBanner(bannerId,body,filepath,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  try {
    let result =await Store.findOneAndUpdate(
      {
        banners: { $elemMatch: { _id: bannerId } }
      },
      {
        $addToSet:{
          modifiedLog
        },
        $set: {
          "banners.$": {
            image: filepath,
            title:body.title,
            desc: body.desc,

          }
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