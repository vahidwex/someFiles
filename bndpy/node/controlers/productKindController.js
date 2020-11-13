const express = require('express');
const router = express.Router();
 
const productKindService = require('../services/productKindService');
const {upload,oo} = require('../helper/uploadFile');
const {isPermit} = require('../helper/authorization');
const _ = require('lodash');

router.get("", isPermit("getproductKinds"), getAll);
router.get("/:id", isPermit("getproductKinds"), getById);
router.post("/create", isPermit("createproductKinds"),upload.single('logo'), create);
router.patch("/edit/:id", isPermit("editproductKinds"),upload.single('logo'), edit);
router.delete("/remove/:id", isPermit("removeproductKinds"), remove);


function getAll(req,res,next){
    productKindService.getAll()
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function getById(req,res,next){
    let id = req.params.id;
    productKindService.getById(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function create(req,res,next){
    
    let body = _.pick(req.body,[ 'title','tags','description','fatherProductKind' ]);
    let filePath =  req.file.filename;
    let userId = req.user._id;
    productKindService.create(body,filePath,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function remove(req,res,next){
    let id = req.params.id;
    productKindService.remove(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function edit(req,res,next){
    let body = _.pick(req.body,[ 'title','tags','logo','description','fatherProductKind']);
    req.file ? body.logo =req.file.filename :body.logo;
    let productKindId=req.params.id;
    let userId = req.user._id;
    productKindService.edit(body ,productKindId,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
module.exports = router ;