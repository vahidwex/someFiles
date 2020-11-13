"use strict";

var mongoose = require("mongoose");

var db = require("../config/db");

var fs = require("fs");

var Product = db.Product;
module.exports = {
  getAll: getAll,
  removeKind: removeKind,
  create: create,
  remove: remove,
  edit: edit,
  getById: getById,
  addAdvantages: addAdvantages,
  removeAdvantages: removeAdvantages,
  getAdvantages: getAdvantages,
  editAdvantages: editAdvantages,
  addBanners: addBanners,
  getBanners: getBanners,
  removeBanners: removeBanners,
  editBanners: editBanners,
  addEducationalSources: addEducationalSources,
  removeEducationalSources: removeEducationalSources,
  editEducationalSources: editEducationalSources,
  getEducationalSources: getEducationalSources,
  addFeatures: addFeatures,
  removeFeatures: removeFeatures,
  getFeatures: getFeatures,
  editFeatures: editFeatures,
  addTechnologies: addTechnologies,
  removeTechnologies: removeTechnologies,
  getTechnologies: getTechnologies,
  getByNameRef: getByNameRef // addFeatureDetails,
  // removeFeatureDetails,
  // getFeatureDetails,
  // editFeatureDetails

}; //#region Main Pruduct

function findById(id) {
  return regeneratorRuntime.async(function findById$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", Product.findOne({
            _id: id
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getAll() {
  return regeneratorRuntime.async(function getAll$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Product.find());

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
} //-------------------------------------------------------------------------------


function create(body, userId, filepath) {
  var modifiedLog, product;
  return regeneratorRuntime.async(function create$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          modifiedLog = {
            date: new Date(),
            userId: userId
          };
          product = new Product({
            logo: filepath,
            titleEnglish: body.titleEnglish,
            title: body.title,
            shortDesc: body.shortDesc,
            LongDesc: body.LongDesc,
            productKind: body.productKind,
            like: body.like,
            bazdid: body.bazdid,
            price: body.price,
            offPrice: body.offPrice,
            sellCount: body.sellCount,
            modifiedLog: modifiedLog
          });
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(product.save());

        case 5:
          return _context3.abrupt("return", product);

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](2);
          console.log(_context3.t0);
          return _context3.abrupt("return", _context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 8]]);
} //-------------------------------------------------------------------------------


function remove(id) {
  var product;
  return regeneratorRuntime.async(function remove$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Product.findOneAndRemove({
            _id: id
          }));

        case 3:
          product = _context4.sent;

          if (product) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", {
            Error: "product not found"
          });

        case 6:
          return _context4.abrupt("return", {
            Message: "product is updated"
          });

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", {
            "errorr is :": _context4.t0
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
} //-------------------------------------------------------------------------------


function edit(body, productId, userId) {
  var modifiedLog, product, _product;

  return regeneratorRuntime.async(function edit$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          modifiedLog = {
            date: new Date(),
            userId: userId
          };
          _context5.next = 3;
          return regeneratorRuntime.awrap(findById(productId));

        case 3:
          product = _context5.sent;
          _context5.prev = 4;
          _context5.next = 7;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            _id: productId
          }, {
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
              sellCount: body.sellCount
            },
            $addToSet: {
              productKind: body.productKind,
              modifiedLog: modifiedLog
            }
          }));

        case 7:
          _product = _context5.sent;

          if (_product) {
            _context5.next = 10;
            break;
          }

          return _context5.abrupt("return", {
            Error: "product not found"
          });

        case 10:
          return _context5.abrupt("return", {
            Message: "product is updated"
          });

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](4);
          return _context5.abrupt("return", {
            "errorr is :": _context5.t0
          });

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[4, 13]]);
}

function getById(id) {
  return regeneratorRuntime.async(function getById$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Product.find({
            _id: id
          }).populate('productKind').exec());

        case 2:
          return _context6.abrupt("return", _context6.sent);

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function getByNameRef(title) {
  return regeneratorRuntime.async(function getByNameRef$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Product.findOne({
            titleEnglish: title
          }).populate('technologies').populate('productKind').exec());

        case 2:
          return _context7.abrupt("return", _context7.sent);

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
} //-------------------------------------------------------------------------------
// #endregion
//#region Technology


function addTechnologies(productId, body, userId) {
  var modifiedLog, product;
  return regeneratorRuntime.async(function addTechnologies$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          modifiedLog = {
            date: new Date(),
            userId: userId
          }; // let technolgies = { body.technologyId };

          console.log(productId, body.technologyId);
          _context8.prev = 2;
          _context8.next = 5;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            _id: productId
          }, {
            $addToSet: {
              technologies: body.technologyId
            }
          }, {
            "new": true
          }));

        case 5:
          product = _context8.sent;

          if (product) {
            _context8.next = 8;
            break;
          }

          return _context8.abrupt("return", {
            Error: "product not found"
          });

        case 8:
          return _context8.abrupt("return", {
            product: product,
            Message: "product is updated"
          });

        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](2);
          return _context8.abrupt("return", {
            "errorr is :": _context8.t0
          });

        case 14:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[2, 11]]);
}

function removeTechnologies(productId, technologyId) {
  var product;
  return regeneratorRuntime.async(function removeTechnologies$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            _id: productId
          }, {
            $pull: {
              technologies: technologyId
            }
          }, {
            "new": true
          }));

        case 3:
          product = _context9.sent;

          if (product) {
            _context9.next = 6;
            break;
          }

          return _context9.abrupt("return", {
            Error: "product not found"
          });

        case 6:
          return _context9.abrupt("return", {
            product: product,
            Message: "product is updated"
          });

        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](0);
          return _context9.abrupt("return", {
            "errorr is :": _context9.t0
          });

        case 12:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function getTechnologies(productId) {
  var product;
  return regeneratorRuntime.async(function getTechnologies$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: productId
          }));

        case 3:
          product = _context10.sent;

          if (product) {
            _context10.next = 6;
            break;
          }

          return _context10.abrupt("return", {
            Error: "product not found"
          });

        case 6:
          return _context10.abrupt("return", product.technologies);

        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10["catch"](0);
          return _context10.abrupt("return", {
            "errorr is :": _context10.t0
          });

        case 12:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 9]]);
} // #endregion
// #region Banners


function addBanners(productId, body, filepath, userId) {
  var modifiedLog, banners, product;
  return regeneratorRuntime.async(function addBanners$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          modifiedLog = {
            date: new Date(),
            userId: userId
          };
          banners = {
            image: filepath,
            title: body.title,
            desc: body.desc
          };
          _context11.prev = 2;
          _context11.next = 5;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            _id: productId
          }, {
            $addToSet: {
              banners: banners,
              modifiedLog: modifiedLog
            }
          }, {
            "new": true
          }));

        case 5:
          product = _context11.sent;

          if (product) {
            _context11.next = 8;
            break;
          }

          return _context11.abrupt("return", {
            Error: "product not found"
          });

        case 8:
          return _context11.abrupt("return", {
            product: product,
            Message: "product is updated"
          });

        case 11:
          _context11.prev = 11;
          _context11.t0 = _context11["catch"](2);
          return _context11.abrupt("return", {
            "errorr is :": _context11.t0
          });

        case 14:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[2, 11]]);
}

function removeBanners(bannerId) {
  var product;
  return regeneratorRuntime.async(function removeBanners$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            banners: {
              $elemMatch: {
                _id: bannerId
              }
            }
          }, {
            $pull: {
              banners: {
                _id: bannerId
              }
            }
          }, {
            "new": true
          }));

        case 3:
          product = _context12.sent;

          if (product) {
            _context12.next = 6;
            break;
          }

          return _context12.abrupt("return", {
            Error: "product not found"
          });

        case 6:
          return _context12.abrupt("return", {
            product: product,
            Message: "product is updated"
          });

        case 9:
          _context12.prev = 9;
          _context12.t0 = _context12["catch"](0);
          return _context12.abrupt("return", {
            "errorr is :": _context12.t0
          });

        case 12:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function editBanners(bannerId, body, filepath, userId) {
  var banner, product;
  return regeneratorRuntime.async(function editBanners$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          banner = {
            image: filepath,
            title: body.title,
            desc: body.desc
          };
          _context13.prev = 1;
          _context13.next = 4;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            banners: {
              $elemMatch: {
                _id: bannerId
              }
            }
          }, {
            $set: {
              "banners.$": {
                image: filepath,
                title: banner.title,
                desc: banner.desc
              }
            }
          }));

        case 4:
          product = _context13.sent;

          if (product) {
            _context13.next = 7;
            break;
          }

          return _context13.abrupt("return", {
            Error: "product not found"
          });

        case 7:
          return _context13.abrupt("return", {
            Message: "product is updated"
          });

        case 10:
          _context13.prev = 10;
          _context13.t0 = _context13["catch"](1);
          return _context13.abrupt("return", {
            "errorr is :": _context13.t0
          });

        case 13:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[1, 10]]);
}

function getBanners(productId) {
  var product;
  return regeneratorRuntime.async(function getBanners$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: productId
          }));

        case 3:
          product = _context14.sent;

          if (product) {
            _context14.next = 6;
            break;
          }

          return _context14.abrupt("return", {
            Error: "product not found"
          });

        case 6:
          return _context14.abrupt("return", product.banners);

        case 9:
          _context14.prev = 9;
          _context14.t0 = _context14["catch"](0);
          return _context14.abrupt("return", {
            "errorr is :": _context14.t0
          });

        case 12:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 9]]);
} // #endregion
//#region Advantages


function addAdvantages(productId, body, iconFilePath, imageFilePath, userId) {
  var modifiedLog, advantages, product;
  return regeneratorRuntime.async(function addAdvantages$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          modifiedLog = {
            date: new Date(),
            userId: userId
          };
          console.log(productId, body, iconFilePath, imageFilePath, userId);
          advantages = {
            icon: iconFilePath,
            image: imageFilePath,
            title: body.title,
            desc: body.desc
          };
          _context15.prev = 3;
          _context15.next = 6;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            _id: productId
          }, {
            $addToSet: {
              advantages: advantages,
              modifiedLog: modifiedLog
            }
          }, {
            "new": true
          }));

        case 6:
          product = _context15.sent;

          if (product) {
            _context15.next = 9;
            break;
          }

          return _context15.abrupt("return", {
            Error: "product not found"
          });

        case 9:
          return _context15.abrupt("return", {
            product: product,
            Message: "product is updated"
          });

        case 12:
          _context15.prev = 12;
          _context15.t0 = _context15["catch"](3);
          return _context15.abrupt("return", {
            "errorr is :": _context15.t0
          });

        case 15:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[3, 12]]);
}

function removeAdvantages(advantageId) {
  var product;
  return regeneratorRuntime.async(function removeAdvantages$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            advantages: {
              $elemMatch: {
                _id: advantageId
              }
            }
          }, {
            $pull: {
              advantages: {
                _id: advantageId
              }
            }
          }, {
            "new": true
          }));

        case 3:
          product = _context16.sent;

          if (product) {
            _context16.next = 6;
            break;
          }

          return _context16.abrupt("return", {
            Error: "product not found"
          });

        case 6:
          return _context16.abrupt("return", {
            product: product,
            Message: "product is updated"
          });

        case 9:
          _context16.prev = 9;
          _context16.t0 = _context16["catch"](0);
          return _context16.abrupt("return", {
            "errorr is :": _context16.t0
          });

        case 12:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function editAdvantages(advantageId, body, iconFilePath, imageFilePath, userId) {
  var product;
  return regeneratorRuntime.async(function editAdvantages$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            advantages: {
              $elemMatch: {
                _id: advantageId
              }
            }
          }, {
            $set: {
              "advantages.$": {
                icon: iconFilePath,
                image: imageFilePath,
                title: body.title,
                desc: body.desc
              }
            }
          }));

        case 3:
          product = _context17.sent;

          if (product) {
            _context17.next = 6;
            break;
          }

          return _context17.abrupt("return", {
            Error: "product not found"
          });

        case 6:
          return _context17.abrupt("return", {
            Message: "product is updated"
          });

        case 9:
          _context17.prev = 9;
          _context17.t0 = _context17["catch"](0);
          return _context17.abrupt("return", {
            "errorr is :": _context17.t0
          });

        case 12:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function getAdvantages(productId) {
  var product;
  return regeneratorRuntime.async(function getAdvantages$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: productId
          }));

        case 3:
          product = _context18.sent;

          if (product) {
            _context18.next = 6;
            break;
          }

          return _context18.abrupt("return", {
            Error: "product not found"
          });

        case 6:
          return _context18.abrupt("return", product.advantages);

        case 9:
          _context18.prev = 9;
          _context18.t0 = _context18["catch"](0);
          return _context18.abrupt("return", {
            "errorr is :": _context18.t0
          });

        case 12:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 9]]);
} // #endregion
//#region EducationalSources


function addEducationalSources(productId, body, iconFilePath, filePath, userId) {
  var modifiedLog, educationalSources, product;
  return regeneratorRuntime.async(function addEducationalSources$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          modifiedLog = {
            date: new Date(),
            userId: userId
          };
          educationalSources = {
            icon: iconFilePath,
            file: filePath,
            fileType: body.fileType,
            title: body.title,
            desc: body.desc
          };
          _context19.prev = 2;
          _context19.next = 5;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            _id: productId
          }, {
            $addToSet: {
              educationalSources: educationalSources,
              modifiedLog: modifiedLog
            }
          }, {
            "new": true
          }));

        case 5:
          product = _context19.sent;

          if (product) {
            _context19.next = 8;
            break;
          }

          return _context19.abrupt("return", {
            Error: "product not found"
          });

        case 8:
          return _context19.abrupt("return", {
            product: product,
            Message: "product is updated"
          });

        case 11:
          _context19.prev = 11;
          _context19.t0 = _context19["catch"](2);
          return _context19.abrupt("return", {
            "errorr is :": _context19.t0
          });

        case 14:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[2, 11]]);
}

function removeEducationalSources(educationalSourceId) {
  var product;
  return regeneratorRuntime.async(function removeEducationalSources$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          _context20.next = 3;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            educationalSources: {
              $elemMatch: {
                _id: educationalSourceId
              }
            }
          }, {
            $pull: {
              educationalSources: {
                _id: educationalSourceId
              }
            }
          }, {
            "new": true
          }));

        case 3:
          product = _context20.sent;

          if (product) {
            _context20.next = 6;
            break;
          }

          return _context20.abrupt("return", {
            Error: "product not found"
          });

        case 6:
          return _context20.abrupt("return", {
            product: product,
            Message: "product is updated"
          });

        case 9:
          _context20.prev = 9;
          _context20.t0 = _context20["catch"](0);
          return _context20.abrupt("return", {
            "errorr is :": _context20.t0
          });

        case 12:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function editEducationalSources(educationalSourceId, body, iconFilePath, filePath, userId) {
  var product;
  return regeneratorRuntime.async(function editEducationalSources$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _context21.next = 3;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            educationalSources: {
              $elemMatch: {
                _id: educationalSourceId
              }
            }
          }, {
            $set: {
              "educationalSources.$": {
                icon: iconFilePath,
                file: filePath,
                fileType: body.fileType,
                title: body.title,
                desc: body.desc
              }
            }
          }));

        case 3:
          product = _context21.sent;

          if (product) {
            _context21.next = 6;
            break;
          }

          return _context21.abrupt("return", {
            Error: "product not found"
          });

        case 6:
          return _context21.abrupt("return", {
            Message: "product is updated"
          });

        case 9:
          _context21.prev = 9;
          _context21.t0 = _context21["catch"](0);
          return _context21.abrupt("return", {
            "errorr is :": _context21.t0
          });

        case 12:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function getEducationalSources(productId) {
  var product;
  return regeneratorRuntime.async(function getEducationalSources$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          _context22.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: productId
          }));

        case 3:
          product = _context22.sent;

          if (product) {
            _context22.next = 6;
            break;
          }

          return _context22.abrupt("return", {
            Error: "product not found"
          });

        case 6:
          return _context22.abrupt("return", product.educationalSources);

        case 9:
          _context22.prev = 9;
          _context22.t0 = _context22["catch"](0);
          return _context22.abrupt("return", {
            "errorr is :": _context22.t0
          });

        case 12:
        case "end":
          return _context22.stop();
      }
    }
  }, null, null, [[0, 9]]);
} // #endregion
//#region Features


function addFeatures(productId, body, iconFilePath, imageFilePath, userId) {
  var modifiedLog, features, product;
  return regeneratorRuntime.async(function addFeatures$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          modifiedLog = {
            date: new Date(),
            userId: userId
          };
          console.log(productId, body, iconFilePath, imageFilePath, userId);
          features = {
            icon: iconFilePath,
            image: imageFilePath,
            title: body.title,
            desc: body.desc,
            featureKind: body.featureKind
          };
          _context23.prev = 3;
          _context23.next = 6;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            _id: productId
          }, {
            $addToSet: {
              features: features,
              modifiedLog: modifiedLog
            }
          }, {
            "new": true
          }));

        case 6:
          product = _context23.sent;

          if (product) {
            _context23.next = 9;
            break;
          }

          return _context23.abrupt("return", {
            Error: "product not found"
          });

        case 9:
          return _context23.abrupt("return", {
            product: product,
            Message: "product is updated"
          });

        case 12:
          _context23.prev = 12;
          _context23.t0 = _context23["catch"](3);
          return _context23.abrupt("return", {
            "errorr is :": _context23.t0
          });

        case 15:
        case "end":
          return _context23.stop();
      }
    }
  }, null, null, [[3, 12]]);
}

function removeFeatures(featureId) {
  var product;
  return regeneratorRuntime.async(function removeFeatures$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          _context24.next = 3;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            features: {
              $elemMatch: {
                _id: featureId
              }
            }
          }, {
            $pull: {
              features: {
                _id: featureId
              }
            }
          }, {
            "new": true
          }));

        case 3:
          product = _context24.sent;

          if (product) {
            _context24.next = 6;
            break;
          }

          return _context24.abrupt("return", {
            Error: "product not found"
          });

        case 6:
          return _context24.abrupt("return", {
            product: product,
            Message: "product is updated"
          });

        case 9:
          _context24.prev = 9;
          _context24.t0 = _context24["catch"](0);
          return _context24.abrupt("return", {
            "errorr is :": _context24.t0
          });

        case 12:
        case "end":
          return _context24.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function editFeatures(featureId, body, iconFilePath, imageFilePath, userId) {
  var product;
  return regeneratorRuntime.async(function editFeatures$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          _context25.prev = 0;
          _context25.next = 3;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            features: {
              $elemMatch: {
                _id: featureId
              }
            }
          }, {
            $set: {
              "features.$": {
                icon: iconFilePath,
                image: imageFilePath,
                title: body.title,
                desc: body.desc,
                featureKind: body.featureKind
              }
            }
          }));

        case 3:
          product = _context25.sent;

          if (product) {
            _context25.next = 6;
            break;
          }

          return _context25.abrupt("return", {
            Error: "product not found"
          });

        case 6:
          return _context25.abrupt("return", {
            Message: "product is updated"
          });

        case 9:
          _context25.prev = 9;
          _context25.t0 = _context25["catch"](0);
          return _context25.abrupt("return", {
            "errorr is :": _context25.t0
          });

        case 12:
        case "end":
          return _context25.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function getFeatures(productId) {
  var product;
  return regeneratorRuntime.async(function getFeatures$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.prev = 0;
          _context26.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: productId
          }));

        case 3:
          product = _context26.sent;

          if (product) {
            _context26.next = 6;
            break;
          }

          return _context26.abrupt("return", {
            Error: "product not found"
          });

        case 6:
          return _context26.abrupt("return", product.features);

        case 9:
          _context26.prev = 9;
          _context26.t0 = _context26["catch"](0);
          return _context26.abrupt("return", {
            "errorr is :": _context26.t0
          });

        case 12:
        case "end":
          return _context26.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function removeKind(productId, kindId) {
  var product;
  return regeneratorRuntime.async(function removeKind$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.prev = 0;
          _context27.next = 3;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            _id: productId
          }, {
            $pull: {
              productKind: kindId
            }
          }, {
            "new": true
          }));

        case 3:
          product = _context27.sent;

          if (product) {
            _context27.next = 6;
            break;
          }

          return _context27.abrupt("return", {
            Error: "product not found"
          });

        case 6:
          return _context27.abrupt("return", {
            product: product,
            Message: "product is updated"
          });

        case 9:
          _context27.prev = 9;
          _context27.t0 = _context27["catch"](0);
          return _context27.abrupt("return", {
            "errorr is :": _context27.t0
          });

        case 12:
        case "end":
          return _context27.stop();
      }
    }
  }, null, null, [[0, 9]]);
} // #endregion
//#region FeatureDetails
// async function addFeatureDetails(productId,featureId, body ,imageFilePath,userId) {
//   let modifiedLog = { date: new Date(), userId: userId };
//   try {
//     let product = await Product.findOneAndUpdate(
//       {
//         features: { $elemMatch: { _id: featureId } }
//       },
//       {
//         $push: {
//            "features.$.featureDetails" :{ image: imageFilePath,
//             title: body.title,
//             desc: body.desc }
//         }
//       },
//       { new: true }
//     );
//     if (!product) {
//       return {
//         Error: "product not found"
//       };
//     }
//     return {
//       Message: "product is updated"
//     };
//   } catch (e) {
//     return { "errorr is :": e };
//   }
// }
// async function removeFeatureDetails( featureDetailId) {
//   try {
//     let product = await Product.findOneAndUpdate(
//       {
//         "features.featureDetails": { $elemMatch: { "_id": featureDetailId } }
//       },
//       {
//         $pull: {
//           "features.$.featureDetails":  { _id: featureDetailId }
//         }
//       },
//       { new: true }
//     );
//     if (!product) {
//       return {
//         Error: "product not found"
//       };
//     }
//     return {
//       Message: "product is updated"
//     };
//   } catch (e) {
//     return { "errorr is :": e };
//   }
// }
// async function editFeatureDetails(featureId, featureDetailId, body ,imageFilePath, userId) {
//   console.log(featureId, featureDetailId, body ,imageFilePath);
//   let featureDetail = {
//     _id : featureDetailId,
//     image: imageFilePath,
//     title: body.title,
//     desc: body.desc
//   };
//   try {
//     let product = await Product.findOne(
//       {
//         features: {
//           $elemMatch: {
//             featureDetails: { $elemMatch: { _id: featureDetailId } }
//           }
//         }
//       }
//     );
//     console.log(product );
//     if (!product) {
//       return {
//         Error: "product not found"
//       };
//     }
//     return {
//       product,
//       Message: "product is updated"
//     };
//   } catch (e) {
//     return { "errorr is :": e };
//   }
// }
// async function getFeatureDetails(productId,featureId) {
//   try {
//     let product= await Product.findOne(
//       {
//         _id: productId,
//         "features.featureDetails": { $elemMatch: { "_id": featureId } }
//       }
//     );
//     if (!product) {
//       return {
//         Error: "product not found"
//       };
//     }
//     return  product.features.featureDetails;
//   } catch (e) {
//     return { "errorr is :": e };
//   }
// }
// #endregion