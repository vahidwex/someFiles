const express = require('express');
const router = express.Router();
const capabilityService = require('../services/capabilityService');
const {upload} = require('../helper/uploadFile');
const {isPermit} = require('../helper/authorization');
const _ = require('lodash');

router.get("", isPermit("getCapability"), getAll);
router.get("/:id", isPermit("getCapability"), getById);
router.post("/create", isPermit("createCapability"),upload.single('logo'), create);
router.patch("/edit/:id", isPermit("editCapability"),upload.single('logo'), edit);
router.delete("/remove/:id", isPermit("removeCapability"), remove);

function getById(req,res,next){
    let id = req.params.id;
    capabilityService.getById(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});
  
  }
function getAll(req,res,next){
    capabilityService.getAll()
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function create(req,res,next){
    let body = _.pick(req.body,[ 'title','tags','kind']);
    let filepath = req.file.filename;
    let userId = req.user._id;
    capabilityService.create(body,filepath,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function remove(req,res,next){
    let id = req.params.id;
    capabilityService.remove(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function edit(req,res,next){
    let body = _.pick(req.body,[ 'title','tags','kind','logo']);
    let capabilityId=req.params.id;
    req.file ? body.logo =req.file.filename :body.logo;
    let userId = req.user._id;
    capabilityService.edit(body,capabilityId,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}


module.exports = router ;