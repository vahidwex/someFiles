const mongoose = require("mongoose");
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const User = db.User;
const Role = db.Role;
module.exports = {
  getAll,
  create,
  changePass,
  createAdmin,
  remove,
  addRole,
  removeRole,
  findByToken,
  findById,
  authenticate,
  addToken,
  removeToken,
  accessReq,
  getById,
  edit 
   
};
//-----------------------------------------------------------------
async function getAll() {
  return await User.find();
}
//-----------------------------------------------------------------
async function create(body, filepath, roleid) {
  let user = new User({
    fullName: body.fullName,
    avatar: filepath,
    email: body.email,
    pass: body.pass
  });

  if (roleid != null) {
    user.roles.push(roleid);
  }

  try {
    await user.save();
    return user;
  } catch (e) {
    console.log(e);
    return e;
  }
}
//-----------------------------------------------------------------
async function createAdmin() {
  try {
    let result =await Role.findOne({ title: "admin" });
    if (!result) {
      return {
        Error: "Record not found"
      };
    }
    console.log(result._id);
    return await create(
      {
        fullName: "admin",
        email: "test@gmail.com",
        pass: "12345678"
      },
      "",
      result._id
    );
  } catch (e) {
    return { "errorr is :": e };
  }
}
//-----------------------------------------------------------------
async function changePass(body) {
  console.log(body);
  
  try {
    let user = await User.findOne({
      _id: body._id
    });
    if (user) {
      user.pass = body.pass;
    }
    await user.save();
    return user;
  } catch (e) {
    return { "errorr :": e };
  }
}
//-----------------------------------------------------------------
async function remove(id) {
  try {
    let result = await User.findOneAndRemove({
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
//-----------------------------------------------------------------
async function addRole(userRole) {
  try {
    let result = await User.findOneAndUpdate(
      {
        _id: userRole.userId
      },
      {
        $addToSet: {
          roles: userRole.roleId
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
      result
    };
  } catch (e) {
    return { "errorr is :": e };
  }
}
//-----------------------------------------------------------------
async function removeRole(userRole) {
  console.log('userRole');
  
  try {
    let result = await User.findOneAndUpdate(
      {
        "_id": userRole.userId
      },
      {
        $pull: {
          roles: userRole.roleId
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
      result
    };
  } catch (e) {
    console.log(e);
     
    return { "errorr is :": e };
  }
}
//-----------------------------------------------------------------
async function removeToken(token) {
  await verifyToken(token)
    .then(decoded => {
      User.findByIdAndUpdate(
        {
          _id: decoded.id
        },
        { $pull: { tokens: { token } } },
        (err, res) => {
          if (err) {
            return err;
          }

          return res;
        }
      );
    })
    .catch(e => {
      return "token does no athorized";
    });
}
//-----------------------------------------------------------------
async function authenticate(email, pass) {
  let foundUser = await User.findOne({ email });
  if (!foundUser) {
    return "User not found...";
  }
  const match = await bcrypt.compare(pass, foundUser.pass);
  
  if (match) {
    let token = await addToken(foundUser);
    return  {foundUser, token} ;
  } else {
    return "";
  }
}
//-----------------------------------------------------------------
async function addToken(user) {
  let access = JSON.stringify(user.roles);
  console.log(access);

  let token = JWT.sign(
    { id: user._id.toHexString(), access },
    process.env.SECRET_KEY
  );

  user.tokens.push({
    token
  });

  return user
    .save()
    .then(() => {
      return token;
    })
    .catch(e => {
      return e;
    });
}
//-----------------------------------------------------------------
async function verifyToken(token) {
  let decoded;

  try {
    decoded = JWT.verify(token, process.env.SECRET_KEY);
    return Promise.resolve(decoded);
  } catch (e) {
    return Promise.reject(e);
  }
}
//-----------------------------------------------------------------
async function findByToken(token) {
  let decoded = await verifyToken(token);
  let user =await User.findOne({
    _id: decoded.id,
    "tokens.token": token
  });

  if(user){
    return user;
  }else{
    return {
      Error: "Record not found"
    };
  }

}
//-----------------------------------------------------------------
async function findById(id) {
  return await User.findOne({
    _id: id
  });
}
//-----------------------------------------------------------------
async function accessReq(token, access) {
  let decoded = await verifyToken(token);
  let roles = JSON.parse(decoded.access);

  let roleList = await Role.find(
    {
      _id: { $in: roles },

      accesses: {
        $elemMatch: { access: access, isAuthorized: true }
      }
    },
    { "accesses.access": 1 }
  );

  if (roleList.length > 0) {
    // console.log(true);
    return true;
  } else {
    // console.log(false);
    return false;
  }
}
async function getById(id) {
  return await User.find({_id : id});
}
async function edit(body,id,userId) {
  let modifiedLog = { date: new Date(), userId: userId };
   console.log(body);
   
  try {
    let result=await User.findOneAndUpdate(
      {
        _id: id 
      } ,
      {
        $set: {
          "avatar" : body.avatar,
          "fullName" : body.fullName 
        },
        addToSet :{
          modifiedLog
        }
      } );

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
// let user = await User.aggregate([
//   {
//     $lookup: {
//       from: "roles",
//       localField: "roles",
//       foreignField: "_id",
//       as: "userRole"
//     }
//   },

//   { $unwind: "$userRole" },
//   {
//     $match: {
//       "userRole.accesses": {
//         $elemMatch: { access: "showUsers", isAuthorized: true }
//       }
//     }
//   },

//   {
//     $project: {
//       "userRole.accesses.access": 1,
//       "userRole.accesses.isAuthorized": 1
//     }
//   }
// ]);  ;
