const express = require('express');
const router = express.Router();
const transportService = require('../services/transportService');
const {isPermit} = require('../helper/authorization');
const _ = require('lodash');

router.get("/getAll", isPermit("getAlltransport"), getAll);
router.get("getById/:id", isPermit("getByIdtransport"), getById);
router.post("/create", isPermit("createtransport"), create);
router.patch("/edit/:id", isPermit("edittransport"), edit);
router.delete("/remove/:id", isPermit("removetransport"), remove);

function getById(req,res,next){
    let id = req.params.id;
    transportService.getById(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});
  
  }
function getAll(req,res,next){
    transportService.getAll()
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function create(req,res,next){
    let body = _.pick(req.body,[ 'title','description','price']);
    let userId = req.user._id;
    transportService.create(body,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function remove(req,res,next){
    let id = req.params.id;
    transportService.remove(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function edit(req,res,next){
    let body = _.pick(req.body,[ 'title','description','price']);
    let transportId=req.params.id;
    let userId = req.user._id;
    transportService.edit(body,transportId,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}


module.exports = router ;