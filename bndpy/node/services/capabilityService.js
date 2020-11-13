const mongoose = require("mongoose");
const db = require("../config/db");
const Capability = db.Capability;

module.exports = {
  getAll,
  getById,
  create,
  remove,
  edit
};

async function getAll() {
  return await Capability.aggregate([
    {
      $lookup: {
        from: "CapabilityKinds",
        localField: "kind",
        foreignField: "_id",
        as: "TCapabilityDocs"
      }
    },
    {
      $project: {
        _id: 1,
        logo: 1,
        title: 1,
        kind: 1,
        tags: 1,
        CapabilityKindTitle: "$CapabilityDocs.title"
      }
    }
  ]);
}
//-------------------------------------------------------------------------------
async function create(body, filepath, userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  let capability = new Capability({
    logo: filepath,
    title: body.title,
    tags: body.tags,
    kind: body.kind,
    modifiedLog
  });

  try {
    await capability.save();
    return capability;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-------------------------------------------------------------------------------
async function remove(id) {
  try {
    let result = await Capability.findOneAndRemove({
      _id: id
    });

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
async function edit(body, capabilityId, userId) {
  let modifiedLog = { date: new Date(), userId: userId };
  try {
    let result = await Capability.findOneAndUpdate(
      {
        _id: capabilityId
      },
      {
        $set: {
          logo: body.logo,
          title: body.title,
          tags: body.tags,
          kind: body.kind
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
async function getById(id) {
  return await Capability.find({_id : id});
}
//-------------------------------------------------------------------------------

