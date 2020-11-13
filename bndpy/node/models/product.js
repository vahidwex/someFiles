const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");

let Schema = new mongoose.Schema({
  logo: { type: String, required: true },
  title: { type: String, require: true },
  titleEnglish: { type: String, require: true, unique: true },
  shortDesc: { type: String, require: true },
  LongDesc: { type: String, require: true },

  banners: [
    {
      icon: { type: String },
      file: { type: String, required: true },
      fileType: { type: String, required: true },
      title: { type: String, require: true },
      desc: { type: String, require: true },
    }
  ],

  exist: { type: Boolean, require: true },
  discountPercent: { type: Number, require: true },
  priority: { type: Number, require: true },
  productCode: { type: String, require: true, unique: true },
  productPoint: { type: Number, require: true },
  like: { type: Number, require: true },
  bazdid: { type: Number, require: true },
  price: { type: Number, require: true },
  offPrice: { type: Number },
  sellCount: { type: Number, require: true },
  count: { type: Number, default: 0 },

  productKind: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductKind" }],

  productFeature: [{
    productDetail: { type: mongoose.Schema.Types.ObjectId, ref: "ProductDetails" },
    featureValue: { type: String, require: true },
    isFeature: { type: Boolean, require: true, default: false }
  }],
  revision: {
    mainTitle: { type: String, require: true },
    description: { type: String, require: true },
    deatils: [
        {
        image: { type: String, required: true },
        title: { type: String, require: true },
        desc: { type: String, require: true }
      }
    ]
  },
  comments: [{
    UiUsers: {type: mongoose.Schema.Types.ObjectId,ref: "UiUsers",required: true},
    time: { type: String, require: true },
    title:{ type: String, require: true },
    desc: { type: String, require: true }
  }],
  modifiedLog: [
    {
      date: { type: String, required: true },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    }
  ]
});

Schema.methods.calculatePrice = async function () {
  const product = this;
  let deduct = 0;

  if (product.discountPercent && product.discountPercent > 0) {

    deduct = (product.price / 100) * product.discountPercent

    product.offPrice = Math.round(product.price - deduct);
  } else {
    product.offPrice = product.price;
  }
  await product.save()

  return product
}
module.exports = mongoose.model('Product', Schema);