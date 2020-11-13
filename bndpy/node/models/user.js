const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

const tokenOptions = {
  type: String,
  required: true
};

let Schema = new mongoose.Schema({
  fullName: { type: String, required: true, minlength: 3, trim: true },
  avatar :{type:String},
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      massage: "{value} is not valid email"
    }
  },
  pass: { type: String, required: true, minlength: 6, trim: true },
  roles: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Role" , required: true }
  ],
  tokens: [{ token: tokenOptions }] 
});

Schema.pre("save", function(next) {
  let user = this;
 
  if (user.isModified("pass")) {
    bcrypt.genSalt(10, (err, salt) => {
      if(err){
        return err;
      }
      bcrypt.hash(user.pass, salt, (err, hash) => {
        user.pass = hash;
       
        
        next();
      });
    });
  } else {
    next();
  }
});

Schema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  let u = _.pick(userObject, ["_id", "fullName", "email","roles","avatar"]);

  return u;
};

Schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", Schema);
