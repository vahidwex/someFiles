const mongoose = require("mongoose");
const db = require("../config/db");
const ProductDetails = db.ProductDetails;
module.exports = {
  getAll,
  getById,
  create,
  remove,
  edit,
  removePDK
};
async function getById(id) {
  return await ProductDetails.find({_id : id}).populate("productDetailsKind");
}
//-------------------------------------------------------------------------------
async function getAll() {
  return await ProductDetails.find();
}

//-------------------------------------------------------------------------------
async function create(body,userId) {
  let modifiedLog = { date: new Date(), userId: userId };

  let productDetails = new ProductDetails({
    productDetailsKind:body.productDetailsKind,
    desc:body.desc,
    modifiedLog
  });

  try {
    await productDetails.save();
    return productDetails;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function remove(id) {
  try {
    let result = await ProductDetails.findOneAndRemove({
      _id: id
    });

    if (!result) {
      return {
        Error: "ProductDetails not found"
      };
    }

    return {
      result,
      Message: "ProductDetails is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
//-------------------------------------------------------------------------------
async function edit(body, productDetailId, userId) {
    let modifiedLog = { date: new Date(), userId: userId };
    try {
      let result = await ProductDetails.findOneAndUpdate(
        {
          _id: productDetailId
        },
        {
          $set:{
            "desc":body.desc
          },
          $addToSet: {
            "productDetailsKind":body.productDetailsKind,
            modifiedLog
          }
          
        },
        {
            new : true
        }
      );
     
      if (!result) {
        return {
          Error: "Record not found"
        };
      }
      result = await getAll();
      return {
        result,
        Message: "Record is updated"
      };
    } catch (e) {
      return { "errorr is :": e };
    }
  }

  
  async function removePDK(body, userId) {
    let modifiedLog = { date: new Date(), userId: userId };
    try {
      let result = await ProductDetails.findOneAndUpdate(
        {
          _id: body.productId
        },
        {
          
          $pullAll: {productDetailsKind: [body.PDK] },
          
          $addToSet:{modifiedLog}
        },
        {
            new : true
        }
      );
     
      if (!result) {
        return {
          Error: "Record not found"
        };
      }
      result = await getAll();
      return {
        result,
        Message: "Record is updated"
      };
    } catch (e) {
      return { "errorr is :": e };
    }
  }
