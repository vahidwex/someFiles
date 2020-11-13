const express = require("express");
const router = express.Router();
const _ = require("lodash");
const roleSevice = require("../services/roleService");
const { isPermit } = require("../helper/authorization");

router.get("", isPermit("getRoles"), getAll);
router.get("/:id", isPermit("getRoles"), getById);
router.post("/create", isPermit("createRole"), create);
 router.post('/createAdmin' ,createAdmin);
router.post("/edit/:id", isPermit("editRole"), edit);
router.delete("/remove/:id", isPermit("removeRole"), remove);
router.post(  "/accessModify/:accessId",  isPermit("modifyAccessRole"),  accessModify);

function getById(req, res, next) {
  let id = req.params.id;
  roleSevice
    .getById(id)
    .then(data => res.status(200).send(data))
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
}
function getAll(req, res, next) {
  roleSevice
    .getAll()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
}

function create(req, res, next) {
  var body = _.pick(req.body, "title");
  roleSevice
    .create(body.title, false)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
}
function createAdmin(req, res, next) {
  
  roleSevice
    .createAdmin()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
}
function edit(req, res, next) {
  var body = _.pick(req.body, "title");
  var id = req.params.id;
  console.log(body);
  
  roleSevice
    .edit(body, id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
}

function remove(req, res, next) {
  var id = req.params.id;
   
  
  roleSevice
    .remove(id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
}

function accessModify(req, res, next) {
   
  var accessId = req.params.accessId;
  console.log(req.body);
  var isAuthorized = req.body.isAuthorized;
  roleSevice
    .accessModify( accessId, isAuthorized)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
}
module.exports = router;
