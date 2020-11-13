const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");

let Schema = new mongoose.Schema({
    products: [
      {
        _id:{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        count: { type: Number, required: true },
        soldPrice: { type: String},
      }
    ],
    transport : { type: mongoose.Schema.Types.ObjectId, ref: "Transport"},

    client : { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    discount: { type: mongoose.Schema.Types.ObjectId, ref: "Discount" },//from discount Model
    lastStatusDate:{ type: String , required:true},

    price: { type: Number, require: true },  // sum of all poducts
    totalPrice: { type: Number, require: true },
    fixedPrice: { type: Number, require: true },
    status: { type: String, require: true },
    discountPrice:{ type: Number , default:0},

    orderProdCount:{ type: Number , require: true},
    
    paymenID: { type: String},
    title: { type: String },
    description:{ type: String},
  
    orderingDate:{ type: String},
    checkOutDate:{ type: String},
    SendProductDate:{ type: String},
});

Schema.methods.generatePriceAndStatus = async function () {
    const order = this

    let total=0;
    productz=[]
    let orderProdCount=0;
    for (let i = 0; i < order.products.length; i++) {

      const element = order.products[i];
      orderProdCount+=element.count
      total+= element._id.offPrice *element.count

      if(!element.soldPrice){
        const soldPrice=element._id.offPrice
        productz.push({...element._doc,soldPrice})
      }
    }
    order.orderProdCount=orderProdCount;
    order.products=productz;

    order.price=total
    let deduct=0;
    
    if(order.discount){

      deduct=(total/100)*order.discount.percent
      order.discountPrice=deduct;
      order.totalPrice=Math.round(total-deduct);
    }else{
      order.totalPrice=total;
    }
    order.totalPrice = ((order.orderProdCount - 1)*1000)+order.totalPrice;

    order.status="pending";

    await order.save()

    return order
}

Schema.methods.reductionEachExtraProd = async function () {
  const order = this

  order.fixedPrice=order.totalPrice+order.transport.price
  await order.save()

  return order
}



module.exports = mongoose.model("Order", Schema);
