const express = require('express');
const router = express.Router();
const productService = require('../services/productService');
const {isPermit} = require('../helper/authorization');
const {upload} = require('../helper/uploadFile');

 
const _ = require('lodash');

router.get("", isPermit("getProducts"), getAll);
router.get("/:id", isPermit("getProducts"), getById);
router.post("/create", isPermit("createProducts"),upload.single('logo'), create);
router.post("/AddproductFeature/:productId", isPermit("createProducts"), AddproductFeature);

router.patch("/edit/:id", isPermit("editProducts"),upload.single('logo'), edit);
router.delete("/remove/:id", isPermit("removeProducts"), remove);
router.delete("/DeleteProductFeature/:featureId/:productId", isPermit("removeProducts"), DeleteProductFeature);


router.patch("/addRevision/:productId", isPermit("editProducts"),upload.single('image'), addRevision);
router.patch("/AddRevisionDetail/:productId", isPermit("editProducts"),upload.single('imagez'), AddRevisionDetail);
router.delete("/DeleteRevissionDetail/:detailid", isPermit("editProducts"), DeleteRevissionDetail);

router.patch("/UpdateRevision/:productId", isPermit("editProducts"), UpdateRevision);



//------------------------Advantages------------------------------

router.get("/getAdvantages/:productId", isPermit("getAdvantagesFromProduct"), getAdvantages);
router.post("/addAdvantages/:productId", isPermit("addAdvantagesToProduct"),upload.fields([{name : 'icon' ,maxCount :1 },{name: 'image' , maxCount :1}]) ,addAdvantages);
router.patch("/editAdvantages/:advantageId", isPermit("addAdvantagesToProduct"),upload.fields([{name : 'icon' ,maxCount :1 },{name: 'image' , maxCount :1}]), editAdvantages);
router.delete("/removeAdvantages/:advantageId", isPermit("removeAdvantagesFromProduct"), removeAdvantages);

//------------------------EducationalSources------------------------------ 

router.get("/getEducationalSources/:productId", isPermit("getEducationalSourcesFromProduct"), getEducationalSources);
router.post("/addEducationalSources/:productId", isPermit("addEducationalSourcesToProduct"),upload.fields([{name : 'icon' ,maxCount :1 },{name: 'file' , maxCount :1}]), addEducationalSources);
router.patch("/editEducationalSources/:educationalSourceId", isPermit("editEducationalSourcesToProduct"),upload.fields([{name : 'icon' ,maxCount :1 },{name: 'file' , maxCount :1}]), editEducationalSources);
router.delete("/removeEducationalSources/:educationalSourceId", isPermit("removEducationalSourcesFromProduct"), removeEducationalSources);

//------------------------Features------------------------------ 

router.get("/getFeatures/:productId", isPermit("getFeaturesFromProduct"), getFeatures);
router.post("/addFeatures/:productId", isPermit("addFeaturesToProduct"),upload.fields([{name : 'icon' ,maxCount :1 },{name: 'image' , maxCount :1}]), addFeatures);
router.patch("/editFeatures/:featureId", isPermit("editFeaturesFromProduct"),upload.fields([{name : 'icon' ,maxCount :1 },{name: 'image' , maxCount :1}]), editFeatures);
router.delete("/removeFeatures/:featureId", isPermit("removeFeaturesFromProduct"), removeFeatures);
//------------------------FeatureDetails------------------------------ 

// router.get("/getFeatureDetails/:productId/:featureId", isPermit("getFeaturesFromProduct"), getFeatureDetails);
// router.post("/addFeatureDetails/:productId/:featureId", isPermit("addFeaturesToProduct"),upload.single( 'image'), addFeatureDetails);
// router.patch("/editFeatureDetails/:featureId/:featureDetailId", isPermit("editFeaturesFromProduct"),upload.single('image'), editFeatureDetails);
// router.delete("/removeFeatureDetails/:featureDetailId", isPermit("removeFeaturesFromProduct"), removeFeatureDetails);

//------------------------Banners------------------------------ 

router.get("/getBanners/:productId", isPermit("getBannersFromProduct"), getBanners);
router.post("/addBanners/:productId", isPermit("addBannersToProduct"),upload.fields([{name : 'icon' ,maxCount :1 },{name: 'file' , maxCount :1}]), addBanners);
router.patch("/editBanners/:bannerId", isPermit("addBannersToProduct"),upload.fields([{name : 'icon' ,maxCount :1 },{name: 'file' , maxCount :1}]), editBanners);
router.delete("/removeBanners/:bannerId", isPermit("removeBannersFromProduct"), removeBanners);

//------------------------Technologies------------------------------ 

router.get("/getTechnologies/:productId", isPermit("getTechnologFromProduct"), getTechnologies);
router.post("/addTechnologies/:productId", isPermit("addTechnologyToProduct"), addTechnologies);
router.delete("/removeTechnologies/:productId/:technologyId", isPermit("removeTechnologFromProduct"), removeTechnologies);

router.delete("/removekind/:productId/:kindid", isPermit("removeTechnologFromProduct"), removeKind);


// #region mainProduct 

function getAll(req,res,next){
    productService.getAll()
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function create(req,res,next){
    let body = _.pick(req.body,['title','shortDesc','LongDesc','titleEnglish','productKind','like','bazdid','price','offPrice','sellCount','publisher','author','exist','discountPercent','priority','productCode','productPoint']);
    let userId = req.user._id;
    let filepath = req.file.filename;
    
    productService.create(body,userId,filepath)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function remove(req,res,next){
    let id = req.params.id;
    productService.remove(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function edit(req,res,next){
    let body = _.pick(req.body,['title','shortDesc','LongDesc','logo'  ,'titleEnglish','productKind','like','bazdid','price','offPrice','sellCount','publisher','author','exist','discountPercent','priority','productCode','productPoint']);
    let productId=req.params.id;
    let userId = req.user._id;
    req.file ? body.logo =req.file.filename :body.logo;
    productService.edit(body,productId,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function getById(req,res,next){
    let id = req.params.id;
    productService.getById(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});
  
  }
// #endregion
 
// #region Advantages 
function addAdvantages(req,res,next){
    let productId = req.params.productId;
    let body = _.pick(req.body,[ 'title','desc' ]);
    let iconFilePath = req.files['icon'][0].filename;
    let imageFilePath = req.files['image'][0].filename;
   
    productService.addAdvantages(productId,body,iconFilePath,imageFilePath,req.user._id)
    .then((result) => {console.log(result);res.status(200).send(result)})
    .catch(err =>{console.log(err);res.status(400).send(err)});
}
function editAdvantages(req,res,next){
   
    let advantageId =req.params.advantageId
    let body = _.pick(req.body,[ 'title','desc' ]);
    let iconFilePath = req.files['icon'][0].filename;
    let imageFilePath = req.files['image'][0].filename;

    productService.editAdvantages( advantageId,body,iconFilePath,imageFilePath,req.user._id)
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
    
}
function getAdvantages(req,res,next){
    let productId = req.params.productId;
     
    productService.getAdvantages( productId )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
 
}
function removeAdvantages(req,res,next){
     
    let advantageId = req.params.advantageId;
     
    productService.removeAdvantages(  advantageId )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
  
}
// #endregion

// #region EducationalSources 
function addEducationalSources(req,res,next){
    let productId = req.params.productId;
    let body = _.pick(req.body,[ 'title','desc' ,'fileType']);
    let iconFilePath = req.files['icon'][0].filename;
    let filePath = req.files['file'][0].filename;
    
   
    productService.addEducationalSources(productId,body,iconFilePath,filePath,req.user._id)
    .then((result) => {console.log(result);res.status(200).send(result)})
    .catch(err =>{console.log(err);res.status(400).send(err)});
}
function editEducationalSources(req,res,next){
   
    let educationalSourceId =req.params.educationalSourceId
    let body = _.pick(req.body,[ 'title','desc','fileType' ]);
    let iconFilePath = req.files['icon'][0].filename;
    let filePath = req.files['file'][0].filename;

    productService.editEducationalSources( educationalSourceId,body,iconFilePath,filePath,req.user._id)
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
    
}
function getEducationalSources(req,res,next){
    let productId = req.params.productId;
     
    productService.getEducationalSources( productId )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
 
}
function removeEducationalSources(req,res,next){
     
    let educationalSourceId = req.params.educationalSourceId;
     
    productService.removeEducationalSources(  educationalSourceId )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
  
}
// #endregion

// #region Features 
function addFeatures(req,res,next){
    let productId = req.params.productId;
    let body = _.pick(req.body,[ 'title','desc' ,'featureKind']);
    let iconFilePath = req.files['icon'][0].filename;
    let imageFilePath = req.files['image'][0].filename;
   
    productService.addFeatures(productId,body,iconFilePath,imageFilePath,req.user._id)
    .then((result) => {console.log(result);res.status(200).send(result)})
    .catch(err =>{console.log(err);res.status(400).send(err)});
}
function editFeatures(req,res,next){
   
    let featureId =req.params.featureId
    let body = _.pick(req.body,[ 'title','desc' ,'featureKind']);
    let iconFilePath = req.files['icon'][0].filename;
    let imageFilePath = req.files['image'][0].filename;
    console.log(featureId);
    productService.editFeatures( featureId,body,iconFilePath,imageFilePath,req.user._id)
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
    
}
function getFeatures(req,res,next){
    let productId = req.params.productId;
     
    productService.getFeatures( productId )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
 
}
function removeFeatures(req,res,next){
     
    let featureId = req.params.featureId;
     
    productService.removeFeatures(  featureId )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
  
}
// #endregion

// #region FeatureDetails 
// function addFeatureDetails(req,res,next){
//     let productId = req.params.productId;
//     let featureId = req.params.featureId;
//     let body = _.pick(req.body,[ 'title','desc' ]);
//     let imageFilePath = req.file.filename;
   
//     productService.addFeatureDetails(productId,featureId,body ,imageFilePath,req.user._id)
//     .then((result) => {console.log(result);res.status(200).send(result)})
//     .catch(err =>{console.log(err);res.status(400).send(err)});
// }
// function editFeatureDetails(req,res,next){
   
//     let featureDetailId =req.params.featureDetailId
//     let featureId = req.params.featureId;
//     let body = _.pick(req.body,[ 'title','desc' ]);
//     let imageFilePath = req.file.filename;

//     productService.editFeatureDetails(featureId, featureDetailId,body,imageFilePath,req.user._id)
//     .then(result => res.status(200).send(result))
//     .catch(err =>res.status(400).send(err));
    
// }
// function getFeatureDetails(req,res,next){
//     let productId = req.params.productId;
//     let featureId = req.params.featureId;
     
//     productService.getFeatureDetails( productId,featureId )
//     .then(result => res.status(200).send(result))
//     .catch(err =>res.status(400).send(err));
 
// }
// function removeFeatureDetails(req,res,next){
     
//     let featureDetailId = req.params.featureDetailId;
     
//     productService.removeFeatureDetails(  featureDetailId )
//     .then(result => res.status(200).send(result))
//     .catch(err =>res.status(400).send(err));
  
// }
// #endregion

// #region Banners 

function addBanners(req,res,next){
    let productId = req.params.productId;
    let body = _.pick(req.body,[ 'title','desc','fileType' ]);
    let filePath = req.files['file'][0].filename;
    let iconpath = req.files['icon'][0].filename;
    productService.addBanners(productId,body,filePath,iconpath,req.user._id)
    .then((result) => {console.log(result);res.status(200).send(result)})
    .catch(err =>{console.log(err);res.status(400).send(err)});
}
function editBanners(req,res,next){
    let bannerId =req.params.bannerId
    let body = _.pick(req.body,[ 'title','desc','fileType' ]);

    let filePath = req.files['file'][0].filename;
    let iconpath = req.files['icon'][0].filename;

    productService.editBanners( bannerId,body,filePath,iconpath,req.user._id)
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
    
}
function getBanners(req,res,next){
    let productId = req.params.productId;
     
    productService.getBanners( productId )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
 
}
function removeBanners(req,res,next){
     
    let bannerId = req.params.bannerId;
     
    productService.removeBanners(  bannerId )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
  
}
// #endregion

// #region Technologies 
function addTechnologies(req,res,next){
    let productId = req.params.productId;
    let body = _.pick(req.body,[ 'technologyId'  ]);
 
   
    productService.addTechnologies(productId,body ,req.user._id)
    .then((result) => {console.log(result);res.status(200).send(result)})
    .catch(err =>{console.log(err);res.status(400).send(err)});
}
 
function getTechnologies(req,res,next){
    let productId = req.params.productId;
     
    productService.getTechnologies( productId )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
 
}
function removeTechnologies(req,res,next){
     
    let technologyId = req.params.technologyId;
    let productId = req.params.productId;
  
    productService.removeTechnologies( productId, technologyId )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
  
}

// #endregion

function removeKind(req,res,next){
     
    let kindid = req.params.kindid;
    let productId = req.params.productId;
  
    productService.removeKind( productId, kindid )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
  
}

function AddproductFeature(req,res,next){
     
    let productId = req.params.productId;
  
    productService.AddproductFeature( productId, req.body )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
  
}


function DeleteProductFeature(req,res,next){
     
    let productId = req.params.productId;
    let featureId= req.params.featureId;
    productService.DeleteProductFeature( featureId, productId )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
  
}
function addRevision(req,res,next){
    let body = _.pick(req.body,['mainTitle','description','imageName','title','desc']);
    let filepath = req.file.filename;
    let productId = req.params.productId;

    productService.addRevision(  productId,body,filepath )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
  
}
function UpdateRevision(req,res,next){
        
    let body = _.pick(req.body,['mainTitle','description']);
    
    let productId = req.params.productId;

    productService.updateRevision(  productId,body )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
      
    
}
function AddRevisionDetail(req,res,next){
    let body = _.pick(req.body,['image','title','desc']);
    let filepath = req.file.filename;
    let productId = req.params.productId;

    productService.AddRevisionDetail(  productId,body,filepath )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
  
}



function DeleteRevissionDetail(req,res,next){
    let detailid = req.params.detailid;
    productService.DeleteRevissionDetail(  detailid )
    .then(result => res.status(200).send(result))
    .catch(err =>res.status(400).send(err));
  
}




module.exports = router ;