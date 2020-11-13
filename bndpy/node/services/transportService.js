const mongoose = require("mongoose");
const db = require("../config/db");
const Transport = db.Transport;

module.exports = {
  getAll,
  getById,
  create,
  remove,
  edit
};
async function getById(id) {
  return await Transport.find({_id : id});
}
//-------------------------------------------------------------------------------
async function getAll() {
  return await Transport.find();
}
//-------------------------------------------------------------------------------
async function create(body) {
  
  let transport = new Transport({
    title:body.title,
    description:body.description,
    price:body.price
  });

  try {
    await transport.save();
    return { transport };
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function remove(id) {
  try {
    let result = await Transport.findOneAndRemove({
      _id: id
    });

    if (!result) {
      return {
        Error: "transport not found"
      };
    }

    return {
      result,
      Message: "transport is removed"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}

//-------------------------------------------------------------------------------
async function edit(body, transportId, userId) {
    let modifiedLog = { date: new Date(), userId: userId };
    try {
      let result = await Transport.findOneAndUpdate(
        {
          _id: transportId
        },
        {
          $set: {
            title:body.title,
            description:body.description,
            price:body.price
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
      return {
        result,
        Message: "Record is updated"
      };
    } catch (e) {
      return { "errorr is :": e };
    }
  }
