const mongoose = require("mongoose");
const db = require("../config/db");
const ProductDetailsKind = db.ProductDetailsKind;
module.exports = {
  getAll,
  getById,
  create,
  remove,
  edit
};
async function getById(id) {
  return await ProductDetailsKind.find({_id : id});
}
//-------------------------------------------------------------------------------
async function getAll() {
  return await ProductDetailsKind.find();
}

//-------------------------------------------------------------------------------
async function create(body,userId) {
  let modifiedLog = { date: new Date(), userId: userId };

  let productDetailsKind = new ProductDetailsKind({
    title:body.title,
    modifiedLog
  });

  try {
    await productDetailsKind.save();
    return productDetailsKind;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function remove(id) {
  try {
    let result = await ProductDetailsKind.findOneAndRemove({
      _id: id
    });

    if (!result) {
      return {
        Error: "ProductDetailsKind not found"
      };
    }

    return {
      result,
      Message: "ProductDetailsKind is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
//-------------------------------------------------------------------------------
async function edit(body, productDetailId, userId) {
    let modifiedLog = { date: new Date(), userId: userId };
    try {
      let result = await ProductDetailsKind.findOneAndUpdate(
        {
          _id: productDetailId
        },
        {
          $set: {
            title: body.title
          },
          $addToSet: {
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
