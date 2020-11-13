const express = require('express');
const router = express.Router();
const customerService = require('../services/customerService');
const {upload} = require('../helper/uploadFile');
const {isPermit} = require('../helper/authorization');

 
const _ = require('lodash');

router.get("", isPermit("getCustomers"), getAll);
router.get("/:id", isPermit("getCustomers"), getById);
router.post("/create", isPermit("createCustomers"),upload.single('logo') ,create);
router.patch("/edit/:id", isPermit("editCustomers"),upload.single('logo') , edit);
router.delete("/remove/:id", isPermit("removeCustomers"), remove);
router.post("/addAddress/:customerId", isPermit("editCustomers") , addAddress);
router.post("/removeAddress/:addressID", isPermit("editCustomers") , removeAddress);
router.post("/addProduct/:customerId", isPermit("editCustomers") , addProduct);
router.post("/removeProduct/:customerId", isPermit("editCustomers") , removeProduct);



function getById(req,res,next){
    let id = req.params.id;
    customerService.getById(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});
  
  }
function getAll(req,res,next){
    customerService.getAll()
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function create(req,res,next){
    let body = _.pick(req.body,[ 'title' ,'site','email','manager','tel' ]);
    let filepath = req.file.filename;
    let userId = req.user._id;
    console.log(userId);
    
    customerService.create(body,filepath,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function remove(req,res,next){
    let id = req.params.id;
    customerService.remove(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function edit(req,res,next){
    let body = _.pick(req.body,[ 'title' ,'site','email','manager','tel','logo' ]);
    req.file ? body.logo =req.file.filename :body.logo;
    let customerId=req.params.id;
    let userId = req.user._id;
    customerService.edit(body ,customerId,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function addAddress(req,res,next){
    let body = _.pick(req.body,[ 'address','positionWidth','positionHeight' ]);
    let userId = req.user._id;
    let customerId = req.params.customerId
    customerService.addAddress(body,customerId,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function removeAddress(req,res,next){
    let id = req.params.productId;
    customerService.removeAddress(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function addProduct(req,res,next){
    let body = _.pick(req.body,[ 'productId'  ]);
    let userId = req.user._id;
    let customerId = req.params.customerId
    customerService.addProduct(body.productId,customerId,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function removeProduct(req,res,next){
    let body = _.pick(req.body,[ 'productId'  ]);
    let userId = req.user._id;
    let customerId = req.params.customerId
    customerService.removeProduct(body.productId,customerId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
module.exports = router ;