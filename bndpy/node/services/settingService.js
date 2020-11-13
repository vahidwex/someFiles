const mongoose = require("mongoose");
const db = require("../config/db");
const Setting = db.Setting;

module.exports = {
  getAll,
  create,
  edit,
  addAddress,
  removeAddress,
  addSocialNetworks,
  removeSocialNetworks
};

async function getAll() {
  const setting = await Setting.find();
  return setting;
}
//-------------------------------------------------------------------------------
async function create(body, filepath,bg, userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  let setting = new Setting({
    logo: filepath,
    companyName: body.companyName,
    email: body.email,
    tel: body.tel,
    fax: body.fax,
    HeaderMessage:body.HeaderMessage,
    productHeader:body.productHeader,
    // educationalSources:body.educationalSources,
    // subeducationalSources:body.subeducationalSources,
    // customers:body.customers,
    abutUsFooter:body.abutUsFooter,
    abutUsPage:body.abutUsPage,
    // footersecoundColumn:body.footersecoundColumn,
    // footerFirstCoumn:body.footerFirstCoumn,
    // footerthirdColumn:body.footerthirdColumn,
    location:body.location,
    downFooterText:body.downFooterText,
    // solutionHeader:body.solutionHeader,
    backGround:bg,
    modifiedLog
  });

  try {
    await setting.save();
    return setting;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function edit(body, settingId, userId,logoFilePath,backGroundFilePath) {
  let modifiedLog = { date: new Date(), userId: userId };
  try {
    let result = await Setting.findOneAndUpdate(
      {
        _id: settingId
      },
      {
        $set: {
          logo:logoFilePath,
          companyName: body.companyName,
          email: body.email,
          tel: body.tel,
          fax: body.fax,
          HeaderMessage:body.HeaderMessage,
          productHeader:body.productHeader,
          educationalSources:body.educationalSources,
          subeducationalSources:body.subeducationalSources,
          customers:body.customers,
          abutUsFooter:body.abutUsFooter,
          abutUsPage:body.abutUsPage,
          footersecoundColumn:body.footersecoundColumn,
          footerFirstCoumn:body.footerFirstCoumn,
          footerthirdColumn:body.footerthirdColumn,
          location:body.location,
          downFooterText:body.downFooterText,
          solutionHeader:body.solutionHeader,
          backGround:backGroundFilePath
        },
        $addToSet: {
          modifiedLog
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
async function addAddress(address,settingId,userId){
   
  try {
    let result =await Setting.findOneAndUpdate(
      {
        _id: settingId
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
    let result = await Setting.findOneAndUpdate(
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
      result,
      Message: "result is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
//-----------------------------------------------------------------
async function addSocialNetworks(socialNetwork,settingId,userId){
   
  try {
    let result = await Setting.findOneAndUpdate(
      {
        _id: settingId
      },
      {
        $addToSet: {
          socialNetworks: socialNetwork
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
async function removeSocialNetworks(socialNetworksId){
  
  try {
    let result = await Setting.findOneAndUpdate(
      {
        socialNetworks: { $elemMatch: { _id: socialNetworksId } }
      },
      {
        $pull: {
          socialNetworks: { _id: socialNetworksId }
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