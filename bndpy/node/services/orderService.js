const mongoose = require("mongoose");
const moment = require("jalali-moment");
const db = require("../config/db");

const Order = db.Order;
const discountService=require("../services/discountService")

module.exports = {
  getAll,
  getById,
  create,
  remove,
  edit,
  getByStatusOrder,
  findManyByIds,
  updateTransport
};
async function getById(id,limit,skip) {
  return await Order.find({_id : id}).limit(parseInt(limit)).skip(parseInt(skip)).exec();
}

async function getByStatusOrder(status,limit,skip) {

  return await Order.find({status : status}).populate("client").limit(parseInt(limit)).skip(parseInt(skip)).populate('products._id').exec();
}


//-------------------------------------------------------------------------------
async function getAll(limit,skip) {
  return await Order.find().populate('products._id').limit(parseInt(limit)).skip(parseInt(skip)).exec();
}

//-------------------------------------------------------------------------------

async function create(body,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  let order
  let time = "";
  var d = new Date();
  var year = d.getFullYear();
  var month = parseInt(d.getMonth());
  var realMonth=month+1;
  var day = d.getDate();
  time=year+"/"+ realMonth +"/"+day;
  var m = moment(time);
  m=m.locale('fa');
  var timez = m.format("YYYY/MMMM/DD");
  
  if(body.discount){
    const discount=await discountService.getByCode(body.discount)

    order = new Order({
    
      products:body.products,
      client:body.client,
      discount:discount[0]._id,
      price:body.price,
      totalPrice:body.totalPrice,
      paymenID:body.paymenID,
      status:body.status,
      lastStatusDate:timez,
      modifiedLog
    });
  }else{
    order = new Order({
      products:body.products,
      client:body.client,
      price:body.price,
      totalPrice:body.totalPrice,
      paymenID:body.paymenID,
      status:body.status,
      lastStatusDate:timez,
      modifiedLog
    });
  }

  try {

    await (await order.save()).populate('products._id').populate('discount').populate('transport').execPopulate();

    const generationProperties= await order.generatePriceAndStatus();
    return generationProperties;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function remove(id) {
  try {
    let result = await Order.findOneAndRemove({
      _id: id
    });

    if (!result) {
      return {
        Error: "record not found"
      };
    }

    return {
      result,
      Message: "record is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
//-------------------------------------------------------------------------------
async function edit(body, orderId, userId) {
  let time = "";
  var d = new Date();
  var year = d.getFullYear();
  var month = parseInt(d.getMonth());
  var realMonth=month+1;
  var day = d.getDate();
  time=year+"/"+ realMonth +"/"+day;
  var m = moment(time);
  m=m.locale('fa');
  var timez = m.format("YYYY/MMMM/DD");
  

    try {
      
      let result = await Order.updateMany(
        {
          _id: orderId
        },
        {
          $set: {
            status: body.status,
            lastStatusDate:timez
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
        result
      };
    } catch (e) {
      return { "errorr is :": e };
    }
  }

  //-------------------------------------------------------------------------------
async function findManyByIds( orderId) {
 
  
    try {
      
      let result = await Order.find().where('_id').in(orderId).populate('client').exec()
     
      if (!result) {
        return {
          Error: "Record not found"
        };
      }
      return {
        result
      };
    } catch (e) {
      return { "errorr is :": e };
    }
  }

  async function updateTransport(orderId, transportId) {
   
      try {
        
        let result = await Order.findByIdAndUpdate(orderId,{
          $set: {
            transport: transportId
          }
        },
         {useFindAndModify: false}).populate('transport');
        const generationProperties= await result.reductionEachExtraProd();
        // return generationProperties;
        if (!result) {
          return {
            Error: "Record not found"
          };
        }
        return {
          generationProperties
        };
      } catch (e) {
        return { "errorr is :": e };
      }
    }