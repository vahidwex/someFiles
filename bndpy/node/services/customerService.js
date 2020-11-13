const mongoose = require("mongoose");
const db = require("../config/db");
const Customer = db.Customer;

module.exports = {
  getAll,
  getById,
  create,
  remove,
  edit,
  addAddress,
  removeAddress,
  addProduct,
  removeProduct,
  getByProductId
};

async function getAll() {
  return await Customer.find();
}
//-------------------------------------------------------------------------------
async function create(body,filepath,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
 
  
  let customer = new Customer({
    logo: filepath,
    title: body.title,
    site : body.site,
    manager : body.manager,
    email : body.manager,
    tel : body.tel,
    modifiedLog
  });
   console.log('customer', customer);
  try {
    await customer.save();
    return customer;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function remove(id) {
  try {
    let result=await Customer.findOneAndRemove(
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
async function edit(body,customerId,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  try {
    let result=await Customer.findOneAndUpdate(
      {
        _id: customerId 
      } ,
      {
        $set: {
          "logo" : body.logo,
          "title" : body.title,
          "site" : body.site,
          "manager" : body.manager,
          "email" : body.manager,
          "tel" : body.tel
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
//-----------------------------------------------------------------
async function addAddress(address,customerId,userId){
   
  try {
    await User.findOneAndUpdate(
      {
        _id: customerId
      },
      {
        $addToSet: {
          addresses: address
        }
      },
      { new: true }
    );

    if (!result) {
      return {
        Error: "Record not found"
      };
    }

    return {
      result,
      Message: "Record is added"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
//-----------------------------------------------------------------
async function removeAddress(addressId){
  
  try {
    let result = await Product.findOneAndUpdate(
      {
        addresses: { $elemMatch: { _id: addressId } }
      },
      {
        $pull: {
          addresses: { _id: addressId }
        }
      },
      { new: true }
    );

    if (!result) {
      return {
        Error: "result not found"
      };
    }

    return {
      Message: "result is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
//-----------------------------------------------------------------
async function addProduct(productId,customerId,userId){
   
  try {
    let result= await Customer.findOneAndUpdate(
      {
        _id: customerId
      },
      {
        $addToSet: {
          productsBuyed: productId
        }
      },
      { new: true }
    );

    if (!result) {
      return {
        Error: "Record not found"
      };
    }

    return {
      result,
      Message: "Record is added"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
//-----------------------------------------------------------------
async function removeProduct(productId,customerId){
  
  try {
    let result = await Customer.findOneAndUpdate(
      {
        _id: customerId
      },
      {
        $pull: {
          productsBuyed: productId
        }
      },
      { new: true }
    );

    if (!result) {
      return {
        Error: "result not found"
      };
    }

    return {
      result,
      Message: "result is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
//-----------------------------------------------------------------
async function getById(id) {
  return await Customer.find({_id : id});
}
//-------------------------------------------------------------------------------
async function getByProductId(id) {
  return await Customer.find({productsBuyed : id});
}
//-------------------------------------------------------------------------------
