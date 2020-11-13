const express = require('express');
const router = express.Router();

const capabilityKindService = require('../services/capabilityKindService');
const {upload} = require('../helper/uploadFile');
const {isPermit} = require('../helper/authorization');
const _ = require('lodash');



router.get("", isPermit("getCapabilityKind"), getAll);
router.get("/:id", isPermit("getCapabilityKind"), getById);
router.post("/create", isPermit("createCapabilityKind"),upload.single('logo'), create);
router.patch("/edit/:id", isPermit("editCapabilityKind"),upload.single('logo'), edit);
router.delete("/remove/:id", isPermit("removeCapabilityKind"), remove);

function getById(req,res,next){
    let id = req.params.id;
    capabilityKindService.getById(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});
  
  }
function getAll(req,res,next){
    capabilityKindService.getAll()
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function create(req,res,next){
    let body = _.pick(req.body,[ 'title','tags' ]);
    let filePath = req.file.filename; 
    let userId = req.user._id;
    capabilityKindService.create(body,filePath, userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function remove(req,res,next){
    let id = req.params.id;
    capabilityKindService.remove(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function edit(req,res,next){
    let body = _.pick(req.body,[ 'title','tags','logo' ]);
    req.file ? body.logo =req.file.filename :body.logo;
    let capabilityKindId=req.params.id;
    let userId = req.user._id;
    capabilityKindService.edit(body ,capabilityKindId,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
module.exports = router ;