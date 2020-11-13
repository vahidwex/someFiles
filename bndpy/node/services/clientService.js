const mongoose = require("mongoose");
const db = require("../config/db");
const Client = db.Client;

module.exports = {
  getAll,
  getById,
  create,
  remove,
  edit,
  checkToken,
  getByToken
};
async function getById(id) {
  return await Client.find({_id : id});
}
//-------------------------------------------------------------------------------
async function getAll() {
  return await Client.find();
}
//-------------------------------------------------------------------------------
async function create(body) {
  
  let client = new Client({
    name:body.name,
    family:body.family,
    mobile:body.mobile,
    address:body.address,
    postalCode:body.postalCode
  });

  try {
    await client.save();
    const token = await client.generateAuthToken()
    return { client, token };
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function remove(id) {
  try {
    let result = await Client.findOneAndRemove({
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
// ----------------------------------------------
async function checkToken({token}) {
  try {
    let result = await Client.findOne({
      token: token
    });

    if (!result) {
      return {
        success:false,
        Error: "Discount not found"

      };
    }

    return true;
  } catch (e) {
    return { "errorr is :": e };
  }
}
// ----------------------------------------------
async function getByToken({token}) {
  try {
    let result = await Client.findOne({
      token: token
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
async function edit(body, clientId) {
    
    try {
      let result = await Client.findOneAndUpdate(
        {
          _id: clientId
        },
        {
          $set: {
            name:body.name,
            family:body.family,
            mobile:body.mobile,
            address:body.address,
            postalCode:body.postalCode,
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
