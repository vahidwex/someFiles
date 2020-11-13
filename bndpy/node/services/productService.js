const mongoose = require("mongoose");
const db = require("../config/db");
const fs = require("fs");
const Product = db.Product;
const moment = require("jalali-moment");
const JWT = require("jsonwebtoken");

module.exports = {
  getAll,
  removeKind,
  create,
  remove,
  edit,
  getById,
  addBanners,
  getBanners,
  removeBanners,
  editBanners,
  addEducationalSources,
  removeEducationalSources,
  editEducationalSources,
  getEducationalSources,
  getByNameRef,
  increaseView,
  increaseLike,
  productsOfBasket,
  AddproductFeature,
  DeleteProductFeature,
  GetproductbyPKid,
  addRevision,
  AddRevisionDetail,
  DeleteRevissionDetail,
  updateRevision,
  addComment
};

//#region Main Pruduct

async function findById(id) {
  return Product.findOne({ _id: id });
}
async function getAll() {
  return await Product.find();
}

async function GetproductbyPKid(id) {
  return await Product.find({ productKind: id });
}

//-------------------------------------------------------------------------------
async function create(body, userId, filepath) {


  let modifiedLog = { date: new Date(), userId: userId };
  let product = new Product({
    logo: filepath,
    titleEnglish: body.titleEnglish,
    title: body.title,
    shortDesc: body.shortDesc,
    LongDesc: body.LongDesc,
    productKind: body.productKind,
    like: body.like,
    bazdid: body.bazdid,
    price: body.price,
    // offPrice:body.offPrice,
    sellCount: body.sellCount,
    discountPercent: body.discountPercent,
    // publisher:body.publisher,
    // author:body.author,
    priority: body.priority,
    exist: body.exist,
    productCode: body.productCode,
    productPoint: body.productPoint,

    modifiedLog
  });

  try {
    await product.save();
    let prod = await product.calculatePrice();
    return prod;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function remove(id) {
  try {
    let product = await Product.findOneAndRemove({
      _id: id
    });

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
async function DeleteProductFeature(featureId, prodId) {
  try {
    let product = await Product.findOneAndUpdate({
      _id: prodId
    },
      {
        $pull: {
          productFeature: { _id: featureId }
        }
      });

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}

//-------------------------------------------------------------------------------
async function edit(body, productId, userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  let product = await findById(productId);


  try {
    let product = await Product.findOneAndUpdate(
      {
        _id: productId
      },
      {
        $set: {
          logo: body.logo,
          title: body.title,
          titleEnglish: body.titleEnglish,
          shortDesc: body.shortDesc,
          LongDesc: body.LongDesc,
          like: body.like,
          bazdid: body.bazdid,
          price: body.price,
          offPrice: body.offPrice,
          sellCount: body.sellCount,
          discountPercent: body.discountPercent,
          publisher: body.publisher,
          author: body.author,
          priority: body.priority,
          exist: body.exist,
          productCode: body.productCode,

          revision: body.revision,
        },
        $addToSet: {
          productKind: body.productKind,
          modifiedLog
        }
      }
    );



    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
async function getById(id) {
  return await Product.find({ _id: id }).populate('productKind').populate("productFeature.productDetail").exec();
}
async function getByNameRef(title) {

  return await Product.findOne({ titleEnglish: title }).populate('productKind').populate("productFeature.productDetail").exec();
}
//-------------------------------------------------------------------------------


// #endregion

//#region Technology

// #endregion

// #region Banners
async function addBanners(productId, body, filepath, iconpath, userId) {
  let modifiedLog = { date: new Date(), userId: userId };

  let banners = {
    file: filepath,
    title: body.title,
    desc: body.desc,
    fileType: body.fileType,
    icon: iconpath
  };

  try {
    let product = await Product.findOneAndUpdate(
      {
        _id: productId
      },
      {
        $addToSet: {
          banners,
          modifiedLog
        }
      },
      { new: true }
    );

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      product,
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
async function removeBanners(bannerId) {


  try {
    let product = await Product.findOneAndUpdate(
      {
        banners: { $elemMatch: { _id: bannerId } }
      },
      {
        $pull: {
          banners: { _id: bannerId }
        }
      },
      { new: true }
    );

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      product,
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
async function editBanners(bannerId, body, filepath, iconpath, userId) {
  let banner = {
    title: body.title,
    desc: body.desc,
    fileType: body.fileType
  };
  try {
    let product = await Product.findOneAndUpdate(
      {
        banners: { $elemMatch: { _id: bannerId } }
      },
      {
        $set: {
          "banners.$": {
            file: filepath,
            icon: iconpath,
            title: banner.title,
            desc: banner.desc,
            fileType: banner.fileType
          }
        }
      }
    );

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
async function getBanners(productId) {
  try {
    let product = await Product.findOne({
      _id: productId
    });
    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return product.banners;
  } catch (e) {
    return { "errorr is :": e };
  }
}
// #endregion


//#region EducationalSources
async function addEducationalSources(
  productId,
  body,
  iconFilePath,
  filePath,
  userId
) {
  let modifiedLog = { date: new Date(), userId: userId };

  let educationalSources = {
    icon: iconFilePath,
    file: filePath,
    fileType: body.fileType,
    title: body.title,
    desc: body.desc
  };

  try {
    let product = await Product.findOneAndUpdate(
      {
        _id: productId
      },
      {
        $addToSet: {
          educationalSources,
          modifiedLog
        }
      },
      { new: true }
    );

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      product,
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
async function removeEducationalSources(educationalSourceId) {
  try {
    let product = await Product.findOneAndUpdate(
      {
        educationalSources: { $elemMatch: { _id: educationalSourceId } }
      },
      {
        $pull: {
          educationalSources: { _id: educationalSourceId }
        }
      },
      { new: true }
    );

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      product,
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
async function editEducationalSources(
  educationalSourceId,
  body,
  iconFilePath,
  filePath,
  userId
) {
  try {
    let product = await Product.findOneAndUpdate(
      {
        educationalSources: { $elemMatch: { _id: educationalSourceId } }
      },
      {
        $set: {
          "educationalSources.$": {
            icon: iconFilePath,
            file: filePath,
            fileType: body.fileType,
            title: body.title,
            desc: body.desc
          }
        }
      }
    );

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
async function getEducationalSources(productId) {
  try {
    let product = await Product.findOne({
      _id: productId
    });
    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return product.educationalSources;
  } catch (e) {
    return { "errorr is :": e };
  }
}
// #endregion

//#region Features


async function removeKind(productId, kindId) {
  try {
    let product = await Product.findOneAndUpdate(
      {
        _id: productId
      },
      {
        $pull: {
          productKind: kindId
        }
      },
      { new: true }
    );

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      product,
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}


async function increaseView(productId) {
  try {
    let product = await Product.findOneAndUpdate(
      {
        _id: productId
      },
      {
        $inc: {
          bazdid: 1
        }
      }
    );

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      product,
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}

async function increaseLike(productId) {
  try {
    let product = await Product.findOneAndUpdate(
      {
        _id: productId
      },
      {
        $inc: {
          like: 1
        }
      }
    );

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      product,
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}


async function increaseView(productId) {
  try {
    let product = await Product.findOneAndUpdate(
      {
        _id: productId
      },
      {
        $inc: {
          bazdid: 1
        }
      }
    );

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      product,
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}

async function AddproductFeature(productId, body) {

  try {


    let product = await Product.findOneAndUpdate(
      {
        _id: productId
      },
      {

        $addToSet: {
          productFeature: body
          // modifiedLog
        }
      }
    );

    if (!product) {
      return {
        Error: "product not found"
      };
    }


    return {

      product,

      Message: "find Successfully"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
async function productsOfBasket(products) {

  arrayOfIds = []
  products.forEach(element => {
    arrayOfIds.push(element._id);
  });


  try {

    let product = await Product.find().where('_id').in(arrayOfIds).populate('productKind').exec()

    if (!product) {
      return {
        Error: "product not found"
      };
    }


    return {

      product,

      Message: "find Successfully"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
// #endregion


async function addRevision(productId, revision,filepath) {

  try {
    let product = await Product.findOneAndUpdate(
      {
        _id: productId
      },
      {

        $set: {
          revision: {
            mainTitle: revision.mainTitle,
            description: revision.description,
            deatils: {
              image: filepath,
              title: revision.title,
              desc: revision.desc
            }
          }
        }
      },{ new: true }

    );

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      product,
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
async function AddRevisionDetail(productId, revision,filepath) {
    const revisionCustom={
      title:revision.title,
      desc:revision.desc,
      image:filepath
    }
  try {
    let product = await Product.findOneAndUpdate(
      {
        _id : productId 
      },
      {
        $addToSet: {
            
            "revision.deatils" :revisionCustom
           
        }  
      },
      {
         new: true 
      }

    );
 
    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      product,
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}

async function DeleteRevissionDetail(detailId) {

  try {
    let product = await Product.findOneAndUpdate(
      {
        "revision.deatils": { $elemMatch: { "_id": detailId } }
      },
      {
        $pull: {
          "revision.deatils" : { _id: detailId }
        }

      },
      { new: true }

    );

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      product,
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}


async function updateRevision(productId,revision) {

  try {
    let product = await Product.findOneAndUpdate(
      {
        _id : productId 
      },
      {
        $set:{
          revision:{
            mainTitle: revision.mainTitle,
            description: revision.description,
          }
        }

      },
      { new: true }

    );

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      product,
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}

async function verifyToken(token) {
  let decoded;

  try {
    decoded = JWT.verify(token, process.env.SECRET_KEY);
    return Promise.resolve(decoded);
  } catch (e) {
    return Promise.reject(e);
  }
}

async function addComment(productId,body,token) {

  let decoded = await verifyToken(token);


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
    let product = await Product.findOneAndUpdate(
      {
        _id : productId 
      },
      {
        $addToSet:{
          comments:{
            title: body.title,
            desc: body.desc,
            time:timez,
            UiUsers:decoded.id
          }
        }

      },
      { new: true }

    );

    if (!product) {
      return {
        Error: "product not found"
      };
    }

    return {
      product,
      Message: "product is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}