const mongoose = require("mongoose");
const db = require("../config/db");
const Technology = db.Technology;

module.exports = {
  getAll,
  getById,
  create,
  remove,
  edit
};
async function getById(id) {
  return await Technology.find({_id : id});
}
//-------------------------------------------------------------------------------
async function getAll() {
  return await Technology.find();
//   return await Technology.aggregate([
//     {$lookup:
//         {
//            from: "TechnologyKinds",
//            localField: "kind",
//            foreignField: "_id",
//            as: "TechnologyDocs"
//         }
//     } ,
//     {
//         $project:{
//             "_id":1,
//             "image" : 1,
//             "description" : 1,
//             "kind" :1,
//             "wikiLink" :1,
//             "TechnologyKindTitle" : "$TechnologyDocs.title" 
//         }
//     }
// ])
}
//-------------------------------------------------------------------------------
async function create(body, filepath, userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  let technology = new Technology({
    image: filepath,
    title: body.title,
    description: body.description,
    kind: body.kind,
    wikiLink: body.wikiLink,
    modifiedLog
  });

  try {
    await technology.save();
    return technology;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function remove(id) {
  try {
    let result = await Technology.findOneAndRemove({
      _id: id
    });

    if (!result) {
      return {
        Error: "Technology not found"
      };
    }

    return {
      result,
      Message: "Technology is updated"
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
//-------------------------------------------------------------------------------
async function edit(body, technologyId, userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  try {
    let result = await Technology.findOneAndUpdate(
      {
        _id: technologyId
      },
      {
        $set: {
          logo: body.image,
          title: body.title,
          kind: body.kind,
          description: body.tags,
          wikilink: body.link
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
//-------------------------------------------------------------------------------
