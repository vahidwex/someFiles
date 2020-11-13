"use strict";

var mongoose = require("mongoose");

var db = require("../config/db");

var Role = db.Role;
var accessList = [{
  key: "createUser",
  value: "اضافه کردن کاربر"
}, {
  key: "getUsers",
  value: "نمایش کاربران"
}, {
  key: "removeUser",
  value: "حذف کاربران"
}, {
  key: "editUser",
  value: "اصلاح کاربر"
}, {
  key: "changePass",
  value: " تغییر رمز عبور کاربر"
}, {
  key: "addRoleToUser",
  value: "اضافه کردن نقش به  کاربر"
}, {
  key: "removeRoleFromUser",
  value: "حذف کردن نقش از  کاربر"
}, {
  key: "createRole",
  value: "اضافه کردن نقش ها"
}, {
  key: "getRoles",
  value: "نمایش نقش ها"
}, {
  key: "removeRole",
  value: "حذف نقش ها"
}, {
  key: "editRole",
  value: "اصاح نقش ها"
}, {
  key: "modifyAccessRole",
  value: "اصاح دسترسی نقش ها"
}, {
  key: "getBanners",
  value: "نمایش بنرها "
}, {
  key: "createBanners",
  value: "اضافه کردن بنرها"
}, {
  key: "removeBanners",
  value: "حذف بنرها"
}, {
  key: "editBanners",
  value: "اصلاح بنرها"
}, {
  key: "getSetting",
  value: "نمایش تنظیمات"
}, {
  key: "createSetting",
  value: "اضافه کردن تنظیمات"
}, {
  key: "removeSetting",
  value: "حذف تنظیمات"
}, {
  key: "editSetting",
  value: "اصلاح تنظیمات"
}, {
  key: "getSolution",
  value: "نمایش راهکار ها"
}, {
  key: "createSolution",
  value: "اضافه کردن راهکار ها"
}, {
  key: "removeSolution",
  value: "حذف راهکار ها"
}, {
  key: "editSolution",
  value: "اصلاح راهکار ها"
}, {
  key: "getSolutionKinds",
  value: "نمایش انواع راهکار ها"
}, {
  key: "createSolutionKinds",
  value: "اضافه کردن انواع راهکار ها"
}, {
  key: "removeSolutionKinds",
  value: "حذف انواع راهکار ها"
}, {
  key: "editSolutionKinds",
  value: "اصلاح انواع راهکار ها"
}, {
  key: "getTechnology",
  value: "نمایش  تکنولوژی ها"
}, {
  key: "createTechnology",
  value: "اضافه کردن  تکنولوژی ها"
}, {
  key: "removeTechnology",
  value: "حذف  تکنولوژی ها"
}, {
  key: "editTechnology",
  value: "اصلاح  تکنولوژی ها"
}, {
  key: "getTechnologyKinds",
  value: "نمایش انواع تکنولوژی ها"
}, {
  key: "createTechnologyKinds",
  value: "اضافه کردن انواع تکنولوژی ها"
}, {
  key: "removeTechnologyKinds",
  value: "حذف انواع تکنولوژی ها"
}, {
  key: "editTechnologyKinds",
  value: "اصلاح انواع تکنولوژی ها"
}, {
  key: "getCapability",
  value: "نمایش قابلیتها"
}, {
  key: "createCapability",
  value: "اضافه کردن قابلیتها"
}, {
  key: "removeCapability",
  value: "حذف قابلیتها"
}, {
  key: "editCapability",
  value: "اصلاح قابلیتها"
}, {
  key: "getCapabilityKind",
  value: "نمایش انواع قابلیتها"
}, {
  key: "getproductKinds",
  value: "نمایش انواع  محصولات"
}, {
  key: "createproductKinds",
  value: "اضافه کردن انواع  محصولات"
}, {
  key: "editproductKinds",
  value: "اصلاح انواع  محصولات"
}, {
  key: "removeproductKinds",
  value: "حذف انواع  محصولات"
}, {
  key: "createCapabilityKind",
  value: "اضافه کردن انواع قابلیتها"
}, {
  key: "removeCapabilityKind",
  value: "حذف انواع قابلیتها"
}, {
  key: "editCapabilityKind",
  value: "اصلاح انواع قابلیتها"
}, {
  key: "getCustomers",
  value: "نمایش مشتریان"
}, {
  key: "createCustomers",
  value: "اضافه کردن مشتریان"
}, {
  key: "removeCustomers",
  value: "حذف مشتریان"
}, {
  key: "editCustomers",
  value: "اصلاح مشتریان"
}, {
  key: "getProducts",
  value: "نمایش محصولات"
}, {
  key: "createProducts",
  value: "اضافه کردن محصولات"
}, {
  key: "removeProducts",
  value: "حذف محصولات"
}, {
  key: "editProducts",
  value: "اصلاح محصولات"
}, {
  key: "addAdvantagesToProduct",
  value: "اضافه کردن مزایا به محصول"
}, {
  key: "addBannersToProduct",
  value: "اضافه کردن بنر ها به محصول"
}, {
  key: "addEducationalSourcesToProduct",
  value: "اضافه کردن منابع آموزشی"
}, {
  key: "addFeaturesToProduct",
  value: "اضافه کردن ویژگی ها"
}, {
  key: "addTechnologyToProduct",
  value: "اضافه کردن فناوری ها به محصول"
}, {
  key: "removEducationalSourcesFromProduct",
  value: "حذف منبع آموزشی"
}, {
  key: "removeAdvantagesFromProduct",
  value: "حذف مزایا از محصولات"
}, {
  key: "removeBannersFromProduct",
  value: "حذف بنر از محصول"
}, {
  key: "removeFeaturesFromProduct",
  value: "حذف ویژگی هز محصول"
}, {
  key: "removeSolutionFromProduct",
  value: "حذف راهکار از محصول"
}, {
  key: "removeTechnologFromProduct",
  value: "حذف فناوری از محصول"
}, {
  key: "getAdvantagesFromProduct",
  value: "نمایش مزایای محصولات"
}, {
  key: "getBannersFromProduct",
  value: " نمایش بنر های یک محصول"
}, {
  key: "getFeaturesFromProduct",
  value: "نمایش ویژگی های محصول"
}, {
  key: "getEducationalSourcesFromProduct",
  value: "نمایش منابع آموزشی محصول"
}, {
  key: "editEducationalSourcesToProduct",
  value: "ویرایش منابع آموزشی محصول"
}, {
  key: "getTechnologFromProduct",
  value: "نمایش فناوری های محصول"
}, {
  key: "editAdvantagesFromProduct",
  value: "اصلاح مزایای محصولات"
}, {
  key: "editBannersFromProduct",
  value: " اصلاح بنر های یک محصول"
}, {
  key: "editFeaturesFromProduct",
  value: "اصلاح ویژگی های محصول"
}, {
  key: "editEducationalSourcesFromProduct",
  value: "اصلاح منابع آموزشی محصول"
}, {
  key: "editTechnologFromProduct",
  value: "اصلاح فناوری های محصول"
}, {
  key: "getFeatureDetailsFromProduct",
  value: " نمایش جزییات ویژگی های محصول"
}, {
  key: "addFeatureDetailsToProduct",
  value: "اضافه کردن جزییات ویژگی ها"
}, {
  key: "editFeatureDetailsFromProduct",
  value: "اصلاح جزییات ویژگی های محصول"
}, {
  key: "removeFeatureDetailsFromProduct",
  value: "حذف جزییات ویژگی هز محصول"
}];
module.exports = {
  getAll: getAll,
  getById: getById,
  create: create,
  edit: edit,
  createAdmin: createAdmin,
  remove: remove,
  accessModify: accessModify
}; //-----------------------------------------------------------------

function getAll() {
  return regeneratorRuntime.async(function getAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Role.find());

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
} //-----------------------------------------------------------------


function create(title, isAuthorized) {
  var accesses, role;
  return regeneratorRuntime.async(function create$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          accesses = [];
          accessList.forEach(function (element) {
            accesses.push({
              access: element.key,
              isAuthorized: isAuthorized
            });
          });
          role = new Role({
            title: title,
            accesses: accesses
          });
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(role.save());

        case 6:
          return _context2.abrupt("return", role);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](3);
          console.log(_context2.t0);
          return _context2.abrupt("return", _context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 9]]);
} //-----------------------------------------------------------------


function edit(body, id) {
  var result;
  return regeneratorRuntime.async(function edit$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Role.findOneAndUpdate({
            _id: id
          }, {
            $set: {
              title: body.title
            }
          }, {
            "new": true
          }));

        case 3:
          result = _context3.sent;

          if (result) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", {
            Error: "Record not found"
          });

        case 6:
          return _context3.abrupt("return", {
            result: result,
            Message: "Record is updated"
          });

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", {
            "errorr is :": _context3.t0
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
} //-----------------------------------------------------------------


function remove(id) {
  var result;
  return regeneratorRuntime.async(function remove$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Role.findOneAndRemove({
            _id: id
          }));

        case 3:
          result = _context4.sent;

          if (result) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", {
            Error: "Record not found"
          });

        case 6:
          return _context4.abrupt("return", {
            result: result,
            Message: "Record is updated"
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
} //-----------------------------------------------------------------


function accessModify(accessId, isAuthorized) {
  var result;
  return regeneratorRuntime.async(function accessModify$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Role.findOneAndUpdate({
            "accesses._id": accessId
          }, {
            $set: {
              "accesses.$.isAuthorized": isAuthorized
            }
          }));

        case 3:
          result = _context5.sent;

          if (result) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", {
            Error: "Record not found"
          });

        case 6:
          return _context5.abrupt("return", {
            result: result,
            Message: "Record is updated"
          });

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", {
            "errorr is :": _context5.t0
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
} //-----------------------------------------------------------------


function createAdmin() {
  return regeneratorRuntime.async(function createAdmin$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(create("admin", true));

        case 2:
          return _context6.abrupt("return", _context6.sent);

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function getById(id) {
  return regeneratorRuntime.async(function getById$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Role.find({
            _id: id
          }));

        case 2:
          return _context7.abrupt("return", _context7.sent);

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
} //-------------------------------------------------------------------------------