const express = require('express');
const router = express.Router();
 
const productDetailsService = require('../services/productDetailsService');
const {upload,oo} = require('../helper/uploadFile');
const {isPermit} = require('../helper/authorization');
const _ = require('lodash');

router.get("/getAll", isPermit("getproductDetails"), getAll);
router.get("/getById/:id", isPermit("getproductDetails"), getById);
router.post("/create", isPermit("createproductDetails"), create);
router.post("/removePDK", isPermit("createproductDetails"), removePDK);


router.patch("/edit/:id", isPermit("editproductDetails"), edit);
router.delete("/remove/:id", isPermit("removeproductDetails"), remove);


function getAll(req,res,next){
    productDetailsService.getAll()
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function getById(req,res,next){
    let id = req.params.id;
    productDetailsService.getById(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});
}
function create(req,res,next){
    let body = _.pick(req.body,[ 'desc','productDetailsKind']);
    // console.log(req.body);
    // let filePath =  req.file.filename;
    let userId = req.user._id;
    productDetailsService.create(body,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function remove(req,res,next){
    let id = req.params.id;
    productDetailsService.remove(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function edit(req,res,next){
    let body = _.pick(req.body,['productDetailsKind','desc']);
    
    let productKindId=req.params.id;
    let userId = req.user._id;
    productDetailsService.edit(body ,productKindId,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}

function removePDK(req,res,next){
    let body = _.pick(req.body,['PDK','productId']);
    
    let productKindId=req.params.id;
    let userId = req.user._id;
    productDetailsService.removePDK(body ,productKindId,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}



module.exports = router ;