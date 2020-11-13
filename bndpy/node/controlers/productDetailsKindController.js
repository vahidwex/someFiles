const express = require('express');
const router = express.Router();
 
const productDetailsKindService = require('../services/productDetailsKindService');
const {upload,oo} = require('../helper/uploadFile');
const {isPermit} = require('../helper/authorization');
const _ = require('lodash');

router.get("/getAll", isPermit("getproductDetailsKinds"), getAll);
router.get("/getById/:id", isPermit("getproductDetailsKinds"), getById);
router.post("/create", isPermit("createproductDetailsKinds"), create);
router.patch("/edit/:id", isPermit("editproductDetailsKinds"), edit);
router.delete("/remove/:id", isPermit("removeproductDetailsKinds"), remove);


function getAll(req,res,next){
    productDetailsKindService.getAll()
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function getById(req,res,next){
    let id = req.params.id;
    productDetailsKindService.getById(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function create(req,res,next){
    let body = _.pick(req.body,[ 'title']);
    console.log(req.body);
    
    let userId = req.user._id;
    productDetailsKindService.create(body,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function remove(req,res,next){
    let id = req.params.id;
    productDetailsKindService.remove(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function edit(req,res,next){
    let body = _.pick(req.body,[ 'title']);
   
    let productKindId=req.params.id;
    let userId = req.user._id;
    productDetailsKindService.edit(body ,productKindId,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
module.exports = router ;