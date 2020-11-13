const mongoose = require("mongoose");
const db = require("../config/db");
const Discount = db.Discount;

const utility=require("../helper/utility")
module.exports = {
  getAll,
  getById,
  create,
  remove,
  edit,
  getByCode
};
async function getById(id) {
  return await Discount.find({_id : id});
}
//-------------------------------------------------------------------------------
async function getAll() {
  return await Discount.find();
}
async function getByCode(Code) {
  return await Discount.find({code : Code});
}
//-------------------------------------------------------------------------------
async function create(body) {
  let modifiedLog = { date: new Date(), userId: userId };

  const Code =utility.uniqueCode();

  let discount = new Discount({
    code:Code,
    percent:body.percent,
    used:false,
    modifiedLog
  });

  try {
    await discount.save();
    return discount;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function remove(id) {
  try {
    let result = await Discount.findOneAndRemove({
      _id: id
    });

    if (!result) {
      return {
        Error: "Discount not found"
      };
    }

    return {
      result,
      Message: "Discount is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
//-------------------------------------------------------------------------------
async function edit(body, discountId, userId) {
    let modifiedLog = { date: new Date(), userId: userId };
    try {
      let result = await Discount.findOneAndUpdate(
        {
          _id: discountId
        },
        {
          $set: {
            code: body.code
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
