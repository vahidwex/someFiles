const express = require('express');
const router = express.Router();
 
const storeService = require('../services/storeService');
const {upload} = require('../helper/uploadFile');
const {isPermit} = require('../helper/authorization');
const _ = require('lodash');

router.get("/getAll", isPermit("getStore"), getAll);
router.get("/getById/:id", isPermit("getStore"), getById);
router.post("/create", isPermit("createStore"),upload.single('logo'), create);
router.patch("/edit/:id", isPermit("editStore"),upload.single('logo'), edit);
router.delete("/remove/:id", isPermit("removeStore"), remove);

router.patch("/addStoreBanner/:id", isPermit("editStore"),upload.single('image'), addStoreBanner);
router.patch("/deletestoreBanner/:bannerId/:storeId", isPermit("editStore"),upload.single('image'), deletestoreBanner);
router.patch("/editStoreBanner/:id", isPermit("editStore"),upload.single('image'), editStoreBanner);

function getAll(req,res,next){
    storeService.getAll()
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function getById(req,res,next){
    let id = req.params.id;
    storeService.getById(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function create(req,res,next){
    // console.log("salaaaaam")
    let body = _.pick(req.body,[ 'productDetailKind','logo','title','banners', 'description']);
    let filePath =  req.file.filename;
    let userId = req.user._id;
    storeService.create(body,filePath,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function remove(req,res,next){
    let id = req.params.id;
    storeService.remove(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function edit(req,res,next){
    let body = _.pick(req.body,[ 'productDetailKind','logo','title','banners','description']);
    req.file ? body.bannerImage =req.file.filename :body.bannerImage;
    let productKindId=req.params.id;
    let userId = req.user._id;
    storeService.edit(body ,productKindId,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}

function addStoreBanner(req,res,next){
    let body = _.pick(req.body,[ 'desc','title']);
    req.file ? body.bannerImage =req.file.filename :body.bannerImage;
    let storeId=req.params.id;
    let filePath =  req.file.filename;
    let userId = req.user._id;
    storeService.addStoreBanner(body ,storeId,filePath,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}

function deletestoreBanner(req,res,next){
    let body = _.pick(req.body,[ 'desc','title','image']);
    req.file ? body.bannerImage =req.file.filename :body.bannerImage;
    let bannerId=req.params.bannerId;
    let storeId=req.params.storeId;
    let userId = req.user._id;
    storeService.deletestoreBanner(bannerId ,storeId,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}

function editStoreBanner(req,res,next){
    let body = _.pick(req.body,[ 'desc','title','image']);
    req.file ? body.bannerImage =req.file.filename :body.bannerImage;
    let bannerId=req.params.id;
    let userId = req.user._id;
    let filePath =  req.file.filename;
    storeService.editStoreBanner(bannerId ,body,filePath,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}




module.exports = router ;