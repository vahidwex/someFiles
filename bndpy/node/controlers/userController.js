
const router = require('express').Router();
const _ = require("lodash");
const userService =require('../services/userService');
const {isPermit} = require('../helper/authorization');
const authService = require('../helper/authorization');

// const {checkPermission} = require('../helper/checkPermissuin.service');


const {upload} = require('../helper/uploadFile');

router.get('/checkPermission/:permission',checkPermissions);

router.get('/',isPermit('getUsers'), getAll);
router.get("/:id", isPermit("getUsers"), getById);
router.get("/get/:token", isPermit("getUsers"), getByToken);
router.post('/create',isPermit('createUser'),upload.single('avatar'),create);
router.post('/edit/:id',isPermit('createUser'),upload.single('avatar'),edit);
router.post('/createAdmin',createAdmin);
router.post('/changePass',isPermit('changePass'),changePass);
router.post('/AddRole',isPermit('addRoleToUser'),addRole)
router.post('/RemoveRole',isPermit('removeRoleFromUser'),removeRole)
router.delete('/:id',isPermit('getUsers'),remove);
 
//-----------------------------------------------------------------
function getAll(req,res,next){
    userService.getAll()
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});
}
//-----------------------------------------------------------------
function create(req,res,next){
    var body = _.pick(req.body, ["fullName","email","pass"]);
    var filepath = req.file.filename;
    userService.create(body,filepath,null)
    .then(data => res.status(200).send(data))
    .catch(err => {console.log(err); res.status(400).send(err);});
}
//-----------------------------------------------------------------
function createAdmin(req,res,next){
 
    userService.createAdmin()
    .then(data => res.status(200).send(data))
    .catch(err => {console.log(err); res.status(400).send(err);});
}
//-----------------------------------------------------------------
function changePass(req,res,next){   
    var body = _.pick(req.body, ["_id","pass"]);
    //var id = req.params.id;
    // console.log(body );
    userService.changePass(body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
}
//-----------------------------------------------------------------
function remove(req,res,next){
    var id = req.params.id;
    userService.remove(id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
}
//-----------------------------------------------------------------
function removeRole(req,res,next){
    var role =_.pick( req.body,["userId","roleId"]) ;
    console.log(role);
    
    userService.removeRole(role)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
} 
//-----------------------------------------------------------------
function addRole(req,res,next){
   
    
    var role =_.pick( req.body,["userId","roleId"]) ;
      
    userService.addRole(role)
    .then(data => {res.status(200).send(data);console.log(data);
    })
    .catch(err => res.status(400).send(err));
}

function getById(req,res,next){
    let id = req.params.id;
    userService.getById(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});
  
  }
  function getByToken(req,res,next){
    let id = req.params.token;
    userService.findByToken(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});
  
  }
  function edit(req, res, next) {
    let body = _.pick(req.body, [ "fullName" ,"avatar"]);
    req.file ? body.avatar =req.file.filename :body.avatar;
    let Id = req.params.id;
    let userId = req.user._id;
    console.log(body)
    userService
      .edit(body, Id, userId)
      .then(data => res.status(200).send(data))
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  }

  function checkPermissions(req, res, next) {
    let token = req.header("x-auth");
    let access = req.params.permission;
    userService.findByToken(token).then(async (user) => {

      if (await userService.accessReq(token, access)) {
            res.status(200).send(true);
      } else {
            res.status(200).send(false);
        }
      })
      .catch(err => { 
        res.status(200).send(false);
      });
  }
module.exports = router;