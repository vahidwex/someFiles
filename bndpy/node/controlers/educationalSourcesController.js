
const express = require('express');
const router = express.Router();
const {isPermit} = require('../helper/authorization');
const {upload} = require('../helper/uploadFile');
const db = require("../config/db");
const _ = require("lodash");

const EducationalSourcesService = require('../services/educationalSources');

// const Product = db.Product;




router.get("/getEducationalSources", isPermit("getEducationalSourcesFromProduct"), getEducationalSources);
router.get("/getByProductId/:productId", isPermit("getEducationalSourcesFromProduct"), getByProductId);
router.post("/addProductIntoES/:productId", isPermit("getEducationalSourcesFromProduct"), addProductIntoES);
router.delete("/removeFromProducts/:productId", isPermit("removEducationalSourcesFromProduct"), removeFromProducts);

router.post("/add", isPermit("addEducationalSourcesToProduct"),upload.fields([{name : 'icon' ,maxCount :1 },{name: 'file' , maxCount :1}]), addEducationalSources);
router.patch("/edit/:educationalSourceId", isPermit("editEducationalSourcesToProduct"),upload.fields([{name : 'icon' ,maxCount :1 },{name: 'file' , maxCount :1}]), editEducationalSources);
router.delete("/removeEducationalSources/:educationalSourceId", isPermit("removEducationalSourcesFromProduct"), removeEducationalSources);



function getByProductId (req,res,next){

    let productId = req.params.productId;
     
    EducationalSourcesService.getEducationalSourcesByProductId( productId )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));

}
function addEducationalSources(req,res,next){
    
    let body = _.pick(req.body,[ 'title','desc' ,'fileType']);
    let iconFilePath = req.files['icon'][0].filename;
    let filePath = req.files['file'][0].filename;
    
   
    EducationalSourcesService.addEducationalSources(body,iconFilePath,filePath,req.user._id)
    .then((result) => {console.log(result);res.status(200).send(result)})
    .catch(err =>{console.log(err);res.status(400).send(err)});

    //linkToProduct(productId,result._id)
}
function editEducationalSources(req,res,next){
    let educationalSourceId =req.params.educationalSourceId
    let body = _.pick(req.body,[ 'title','desc','fileType' ]);
    let iconFilePath = req.files['icon'][0].filename;
    let filePath = req.files['file'][0].filename;

    EducationalSourcesService.editEducationalSources( educationalSourceId,body,iconFilePath,filePath,req.user._id)
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
    
}
function getEducationalSources(req,res,next){
    let productId = req.params.productId;
     
    EducationalSourcesService.getAll()
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
 
}
function removeEducationalSources(req,res,next){
     
    let educationalSourceId = req.params.educationalSourceId;
     
    EducationalSourcesService.removeEducationalSources(  educationalSourceId )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
  
}
function addProductIntoES(req,res,next){
     
    let productId = req.params.productId;
    const ESSourceId=req.body.esSourceId;
    EducationalSourcesService.addProductIntoES( ESSourceId,productId,req.user._id )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
  
}
function removeFromProducts(req,res,next){
    console.log("ads")
    let productId = req.params.productId;
    const ESSourceId=req.body.esId;
    EducationalSourcesService.removeFromProducts( ESSourceId,productId,req.user._id )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
}
module.exports = router;
// function linkToProduct(productId,educationalSourcesId){
//     try{
        
//         let product = await Product.findOneAndUpdate(
//             {
//             _id: productId
//             },
//             {
//                 $push: {
//                     educationalSources:educationalSourcesId
//                 }
//             }
//         )
//         if (!product) {
//             return {
//             Error: "product not found"
//             };
//         }
    
//         return {
//             Message: "product is updated"
//         };

//     } catch (e) {
//         return { "errorr is :": e };
//     }
// }