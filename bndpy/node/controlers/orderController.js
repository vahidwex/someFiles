const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');
const {isPermit} = require('../helper/authorization');
const _ = require('lodash');

router.get("/getAll", isPermit("getAllOrder"), getAll);
router.get("/getByIdOrder:id", isPermit("getByIdOrder"), getById);
router.get("/findManyByIds/:id", isPermit("getByIdOrder"), findManyByIds);
router.get("/getByStatusOrder/:status", isPermit("getByIdOrder"), getByStatusOrder);
router.post("/create", isPermit("createOrder"), create);
router.patch("/editStatus/:id", isPermit("editStatusOrder"), editStatus);
router.delete("/remove/:id", isPermit("removeOrder"), remove);





function getById(req,res,next){
    let id = req.params.id;
    orderService.getById(id,req.query.limit,req.query.skip)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});
  }
  function getByStatusOrder(req,res,next){
    let status = req.params.status;
    orderService.getByStatusOrder(status,req.query.limit,req.query.skip)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});
  
  }
function getAll(req,res,next){
    orderService.getAll(req.query.limit,req.query.skip)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function create(req,res,next){
    let body = _.pick(req.body,[ 'title','description','price']);
    let userId = req.user._id;
    orderService.create(body,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function remove(req,res,next){
    let id = req.params.id;
    orderService.remove(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function editStatus(req,res,next){
    let body = _.pick(req.body,[ 'status' ]);
    let OrderId=req.params.id;
    console.log('--- OrderId ---')
    console.log(OrderId)
    
    const orderidArray=OrderId.split(",");
    console.log("--- orderidArray ---")
    console.log(orderidArray)

    let userId = req.user._id;
    orderService.edit(body,orderidArray,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}

function findManyByIds(req,res,next){
    console.log("-----inside-----")
    let OrderId=req.params.id;
    const orderidArray=OrderId.split(",");
    orderService.findManyByIds(orderidArray)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}




module.exports = router ;