const mongoose = require("mongoose");
const db = require("../config/db");
const Role = db.Role;
 
const accessList = [
  { key: "createUser", value: "اضافه کردن کاربر" },
  { key: "getUsers", value: "نمایش کاربران" },
  { key: "removeUser", value: "حذف کاربران" },
  { key: "editUser", value: "اصلاح کاربر" },
  { key: "changePass", value: " تغییر رمز عبور کاربر" },
  { key: "addRoleToUser", value: "اضافه کردن نقش به  کاربر" },
  { key: "removeRoleFromUser", value: "حذف کردن نقش از  کاربر" },
  { key: "createRole", value: "اضافه کردن نقش ها" },
  { key: "getRoles", value: "نمایش نقش ها" },
  { key: "removeRole", value: "حذف نقش ها" },
  { key: "editRole", value: "اصاح نقش ها" },
  { key: "modifyAccessRole", value: "اصاح دسترسی نقش ها" },
  { key: "getBanners", value: "نمایش بنرها " },
  { key: "createBanners", value: "اضافه کردن بنرها" },
  { key: "removeBanners", value: "حذف بنرها" },
  { key: "editBanners", value: "اصلاح بنرها" },
  { key: "getSetting", value: "نمایش تنظیمات" },
  { key: "createSetting", value: "اضافه کردن تنظیمات" },
  { key: "removeSetting", value: "حذف تنظیمات" },
  { key: "editSetting", value: "اصلاح تنظیمات" },
  { key: "getSolution", value: "نمایش راهکار ها" },
  { key: "createSolution", value: "اضافه کردن راهکار ها" },
  { key: "removeSolution", value: "حذف راهکار ها" },
  { key: "editSolution", value: "اصلاح راهکار ها" },
  { key: "getSolutionKinds", value: "نمایش انواع راهکار ها" },
  { key: "createSolutionKinds", value: "اضافه کردن انواع راهکار ها" },
  { key: "removeSolutionKinds", value: "حذف انواع راهکار ها" },
  { key: "editSolutionKinds", value: "اصلاح انواع راهکار ها" },
  { key: "getTechnology", value: "نمایش  تکنولوژی ها" },
  { key: "createTechnology", value: "اضافه کردن  تکنولوژی ها" },
  { key: "removeTechnology", value: "حذف  تکنولوژی ها" },
  { key: "editTechnology", value: "اصلاح  تکنولوژی ها" },
  { key: "getTechnologyKinds", value: "نمایش انواع تکنولوژی ها" },
  { key: "createTechnologyKinds", value: "اضافه کردن انواع تکنولوژی ها" },
  { key: "removeTechnologyKinds", value: "حذف انواع تکنولوژی ها" },
  { key: "editTechnologyKinds", value: "اصلاح انواع تکنولوژی ها" },
  { key: "getCapability", value: "نمایش قابلیتها" },
  { key: "createCapability", value: "اضافه کردن قابلیتها" },
  { key: "removeCapability", value: "حذف قابلیتها" },
  { key: "editCapability", value: "اصلاح قابلیتها" },
  { key: "getCapabilityKind", value: "نمایش انواع قابلیتها" },

  { key: "getproductKinds", value: "نمایش انواع  محصولات" },
  { key: "createproductKinds", value: "اضافه کردن انواع  محصولات" },
  { key: "editproductKinds", value: "اصلاح انواع  محصولات" },
  { key: "removeproductKinds", value: "حذف انواع  محصولات" },

  



  { key: "createCapabilityKind", value: "اضافه کردن انواع قابلیتها" },
  { key: "removeCapabilityKind", value: "حذف انواع قابلیتها" },
  { key: "editCapabilityKind", value: "اصلاح انواع قابلیتها" },
  { key: "getCustomers", value: "نمایش مشتریان" },
  { key: "createCustomers", value: "اضافه کردن مشتریان" },
  { key: "removeCustomers", value: "حذف مشتریان" },
  { key: "editCustomers", value: "اصلاح مشتریان" },
  { key: "getProducts", value: "نمایش محصولات" },
  { key: "createProducts", value: "اضافه کردن محصولات" },
  { key: "removeProducts", value: "حذف محصولات" },
  { key: "editProducts", value: "اصلاح محصولات" },
  { key: "addAdvantagesToProduct", value: "اضافه کردن مزایا به محصول" },
  { key: "addBannersToProduct", value: "اضافه کردن بنر ها به محصول" },
  { key: "addEducationalSourcesToProduct", value: "اضافه کردن منابع آموزشی" },
  { key: "addFeaturesToProduct", value: "اضافه کردن ویژگی ها" },
  { key: "addTechnologyToProduct", value: "اضافه کردن فناوری ها به محصول" },
  { key: "removEducationalSourcesFromProduct", value: "حذف منبع آموزشی" },
  { key: "removeAdvantagesFromProduct", value: "حذف مزایا از محصولات" },
  { key: "removeBannersFromProduct", value: "حذف بنر از محصول" },
  { key: "removeFeaturesFromProduct", value: "حذف ویژگی هز محصول" },
  { key: "removeSolutionFromProduct", value: "حذف راهکار از محصول" },
  { key: "removeTechnologFromProduct", value: "حذف فناوری از محصول" },
  { key: "getAdvantagesFromProduct", value: "نمایش مزایای محصولات" },
  { key: "getBannersFromProduct", value: " نمایش بنر های یک محصول" },
  { key: "getFeaturesFromProduct", value: "نمایش ویژگی های محصول" },

  { key: "getAllOrder", value: "نمایش سفارش ها" },
  { key: "getByIdOrder", value: "نمایش سفارش بر اساس ای دی" },
  { key: "getByStatusOrder", value: "نمایش سفارش بر اساس وضعیت" },
  { key: "createOrder", value: "افزودن سفارش" },
  { key: "editStatusOrder", value: "ویرایش سفارش" },
  { key: "removeOrder", value: "حذف سفارش" },

  { key: "getAlltransport", value: "نمایش شرکت های حمل و نقل" },
  { key: "getByIdtransport", value: "نمایش شرکت حمل و نقل" },
  { key: "createtransport", value: "افزودن شرکت حمل و نقل" },
  { key: "edittransport", value: "ویرایش شرکت حمل و نقل" },
  { key: "removetransport", value: "حذف شرکت حمل و نقل" },


  
  { key: "getproductDetailsKinds", value: "نمایش دسته بندی انواع محصولات" },
  { key: "createproductDetailsKinds", value: "افزودن دسته بندی انواع محصولات" },
  { key: "editproductDetailsKinds", value: "ویرایش دسته بندی انواع محصولات" },
  { key: "removeproductDetailsKinds", value: "حذف دسته بندی انواع محصولات" },

  
  { key: "getproductDetails", value: "نمایش جزئیات محصول" },
  { key: "createproductDetails", value: "افزودن جزئیات محصول" },
  { key: "editproductDetails", value: "ویرایش جزئیات محصول" },
  { key: "removeproductDetails", value: "حذف جزئیات محصول" },


  { key: "getStore", value: "نمایش قرفه ها" },
  { key: "createStore", value: "افزودن قرفه" },
  { key: "editStore", value: "ویرایش قرفه ها" },
  { key: "removeStore", value: "حذف قرفه ها" },

  {
    key: "getEducationalSourcesFromProduct",
    value: "نمایش منابع آموزشی محصول"
  },
  {
    key: "editEducationalSourcesToProduct",
    value: "ویرایش منابع آموزشی محصول"
  },
  
  { key: "getTechnologFromProduct", value: "نمایش فناوری های محصول" },
  { key: "editAdvantagesFromProduct", value: "اصلاح مزایای محصولات" },
  { key: "editBannersFromProduct", value: " اصلاح بنر های یک محصول" },
  { key: "editFeaturesFromProduct", value: "اصلاح ویژگی های محصول" },
  {
    key: "editEducationalSourcesFromProduct",
    value: "اصلاح منابع آموزشی محصول"
  },
  { key: "editTechnologFromProduct", value: "اصلاح فناوری های محصول" },
  {
    key: "getFeatureDetailsFromProduct",
    value: " نمایش جزییات ویژگی های محصول"
  },
  { key: "addFeatureDetailsToProduct", value: "اضافه کردن جزییات ویژگی ها" },
  {
    key: "editFeatureDetailsFromProduct",
    value: "اصلاح جزییات ویژگی های محصول"
  },
  { key: "removeFeatureDetailsFromProduct", value: "حذف جزییات ویژگی هز محصول" }
];

module.exports = {
  getAll,
  getById,
  create,
  edit,
  createAdmin,
  remove,
  accessModify
};
//-----------------------------------------------------------------

async function getAll() {
  return await Role.find();
}
//-----------------------------------------------------------------

async function create(title, isAuthorized) {
 
  
  let accesses = [];
  accessList.forEach(function(element) {
    accesses.push({
      access: element.key,
      isAuthorized: isAuthorized
    });
  });

  let role = new Role({
    title: title,
    accesses
  });

  try {
    await role.save();
    return role;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-----------------------------------------------------------------

async function edit(body, id) {
  try {
    let result = await Role.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          title: body.title
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
      Message: "Record is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
//-----------------------------------------------------------------

async function remove(id) {
  try {
    let result = await Role.findOneAndRemove({
      _id: id
    });

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

async function accessModify(  accessId, isAuthorized) {
  //console.log(roleId,accessId,isAuthorized);
  try {
    let result = await Role.findOneAndUpdate(
      {
         
        "accesses._id": accessId
      },
      {
        $set: {
          "accesses.$.isAuthorized": isAuthorized
        }
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
//-----------------------------------------------------------------

async function createAdmin() {
  return await create("admin", true);
}
async function getById(id) {
  return await Role.find({_id : id});
}
//-------------------------------------------------------------------------------

