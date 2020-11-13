const mongoose = require("mongoose");
const router = require("express").Router();

const _ = require("lodash");
const userService = require("../services/userService");
const roleService = require("../services/roleService");

router.post("/", login);
router.delete("/", logOut);
router.get('/fill',isCollectionExist) ;

async function login(req, res, next) {
   
  let email = req.body.email;
  let pass = req.body.pass;
  console.log(email, pass);
  
  await userService
    .authenticate(email, pass)
 
    .then(result => {
      //let token = user.tokens[user.tokens.length - 1].token;
      res.setHeader("x-auth", result.token);
      res.status(200).send({ result})
    })
    .catch(e => {
      console.log(e);
      res.status(300).send(e);
    });
}

async function logOut(req, res, next) {
  let token = req.header("x-auth");

  await userService
    .removeToken(token)
    .then(result => {
      res.removeHeader("x-auth");
      res.status(200).send("x-auth removed");
    })
    .catch(e => {
      console.log(e);
      res.status(400).send(e);
    });
}

async function isCollectionExist(req, res, next) {
  await mongoose.connection.db.collections(async function(err, collections) {
    if (err) console.log(err);
    else {
      try {
        if (!(await collections.some(ele => ele.name == "roles"))) {
          await roleService.createAdmin();
        }
        if (!(await collections.some(ele => ele.name == "users"))) {
          await userService.createAdmin();
        }
        res.status(200).send('fill done');
      } catch (e) { res.status(400).send('fill not done')}
    }
  });
}
module.exports = router;
