"use strict";

var express = require('express');

var router = express.Router();

var productService = require('../services/productService');

var _require = require('../helper/authorization'),
    isPermit = _require.isPermit;

var _require2 = require('../helper/uploadFile'),
    upload = _require2.upload;

var _ = require('lodash');

router.get("", isPermit("getProducts"), getAll);
router.get("/:id", isPermit("getProducts"), getById);
router.post("/create", isPermit("createProducts"), upload.single('logo'), create);
router.patch("/edit/:id", isPermit("editProducts"), upload.single('logo'), edit);
router["delete"]("/remove/:id", isPermit("removeProducts"), remove); //------------------------Advantages------------------------------

router.get("/getAdvantages/:productId", isPermit("getAdvantagesFromProduct"), getAdvantages);
router.post("/addAdvantages/:productId", isPermit("addAdvantagesToProduct"), upload.fields([{
  name: 'icon',
  maxCount: 1
}, {
  name: 'image',
  maxCount: 1
}]), addAdvantages);
router.patch("/editAdvantages/:advantageId", isPermit("addAdvantagesToProduct"), upload.fields([{
  name: 'icon',
  maxCount: 1
}, {
  name: 'image',
  maxCount: 1
}]), editAdvantages);
router["delete"]("/removeAdvantages/:advantageId", isPermit("removeAdvantagesFromProduct"), removeAdvantages); //------------------------EducationalSources------------------------------ 

router.get("/getEducationalSources/:productId", isPermit("getEducationalSourcesFromProduct"), getEducationalSources);
router.post("/addEducationalSources/:productId", isPermit("addEducationalSourcesToProduct"), upload.fields([{
  name: 'icon',
  maxCount: 1
}, {
  name: 'file',
  maxCount: 1
}]), addEducationalSources);
router.patch("/editEducationalSources/:educationalSourceId", isPermit("editEducationalSourcesToProduct"), upload.fields([{
  name: 'icon',
  maxCount: 1
}, {
  name: 'file',
  maxCount: 1
}]), editEducationalSources);
router["delete"]("/removeEducationalSources/:educationalSourceId", isPermit("removEducationalSourcesFromProduct"), removeEducationalSources); //------------------------Features------------------------------ 

router.get("/getFeatures/:productId", isPermit("getFeaturesFromProduct"), getFeatures);
router.post("/addFeatures/:productId", isPermit("addFeaturesToProduct"), upload.fields([{
  name: 'icon',
  maxCount: 1
}, {
  name: 'image',
  maxCount: 1
}]), addFeatures);
router.patch("/editFeatures/:featureId", isPermit("editFeaturesFromProduct"), upload.fields([{
  name: 'icon',
  maxCount: 1
}, {
  name: 'image',
  maxCount: 1
}]), editFeatures);
router["delete"]("/removeFeatures/:featureId", isPermit("removeFeaturesFromProduct"), removeFeatures); //------------------------FeatureDetails------------------------------ 
// router.get("/getFeatureDetails/:productId/:featureId", isPermit("getFeaturesFromProduct"), getFeatureDetails);
// router.post("/addFeatureDetails/:productId/:featureId", isPermit("addFeaturesToProduct"),upload.single( 'image'), addFeatureDetails);
// router.patch("/editFeatureDetails/:featureId/:featureDetailId", isPermit("editFeaturesFromProduct"),upload.single('image'), editFeatureDetails);
// router.delete("/removeFeatureDetails/:featureDetailId", isPermit("removeFeaturesFromProduct"), removeFeatureDetails);
//------------------------Banners------------------------------ 

router.get("/getBanners/:productId", isPermit("getBannersFromProduct"), getBanners);
router.post("/addBanners/:productId", isPermit("addBannersToProduct"), upload.single('image'), addBanners);
router.patch("/editBanners/:bannerId", isPermit("addBannersToProduct"), upload.single('image'), editBanners);
router["delete"]("/removeBanners/:bannerId", isPermit("removeBannersFromProduct"), removeBanners); //------------------------Technologies------------------------------ 

router.get("/getTechnologies/:productId", isPermit("getTechnologFromProduct"), getTechnologies);
router.post("/addTechnologies/:productId", isPermit("addTechnologyToProduct"), addTechnologies);
router["delete"]("/removeTechnologies/:productId/:technologyId", isPermit("removeTechnologFromProduct"), removeTechnologies);
router["delete"]("/removekind/:productId/:kindid", isPermit("removeTechnologFromProduct"), removeKind); // #region mainProduct 

function getAll(req, res, next) {
  productService.getAll().then(function (data) {
    return res.status(200).send(data);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send(err);
  });
}

function create(req, res, next) {
  var body = _.pick(req.body, ['title', 'shortDesc', 'LongDesc', 'titleEnglish', 'productKind', 'like', 'bazdid', 'price', 'offPrice', 'sellCount']);

  var userId = req.user._id;
  var filepath = req.file.filename;
  console.log('filepath:', filepath);
  productService.create(body, userId, filepath).then(function (data) {
    return res.status(200).send(data);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send(err);
  });
}

function remove(req, res, next) {
  var id = req.params.id;
  productService.remove(id).then(function (data) {
    return res.status(200).send(data);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send(err);
  });
}

function edit(req, res, next) {
  var body = _.pick(req.body, ['title', 'shortDesc', 'LongDesc', 'logo', 'titleEnglish', 'productKind', 'like', 'bazdid', 'price', 'offPrice', 'sellCount']);

  var productId = req.params.id;
  var userId = req.user._id;
  req.file ? body.logo = req.file.filename : body.logo;
  productService.edit(body, productId, userId).then(function (data) {
    return res.status(200).send(data);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send(err);
  });
}

function getById(req, res, next) {
  var id = req.params.id;
  productService.getById(id).then(function (data) {
    return res.status(200).send(data);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send(err);
  });
} // #endregion
// #region Advantages 


function addAdvantages(req, res, next) {
  var productId = req.params.productId;

  var body = _.pick(req.body, ['title', 'desc']);

  var iconFilePath = req.files['icon'][0].filename;
  var imageFilePath = req.files['image'][0].filename;
  productService.addAdvantages(productId, body, iconFilePath, imageFilePath, req.user._id).then(function (result) {
    console.log(result);
    res.status(200).send(result);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send(err);
  });
}

function editAdvantages(req, res, next) {
  var advantageId = req.params.advantageId;

  var body = _.pick(req.body, ['title', 'desc']);

  var iconFilePath = req.files['icon'][0].filename;
  var imageFilePath = req.files['image'][0].filename;
  productService.editAdvantages(advantageId, body, iconFilePath, imageFilePath, req.user._id).then(function (result) {
    return res.status(200).send(result);
  })["catch"](function (err) {
    return res.status(400).send(err);
  });
}

function getAdvantages(req, res, next) {
  var productId = req.params.productId;
  productService.getAdvantages(productId).then(function (result) {
    return res.status(200).send(result);
  })["catch"](function (err) {
    return res.status(400).send(err);
  });
}

function removeAdvantages(req, res, next) {
  var advantageId = req.params.advantageId;
  productService.removeAdvantages(advantageId).then(function (result) {
    return res.status(200).send(result);
  })["catch"](function (err) {
    return res.status(400).send(err);
  });
} // #endregion
// #region EducationalSources 


function addEducationalSources(req, res, next) {
  var productId = req.params.productId;

  var body = _.pick(req.body, ['title', 'desc', 'fileType']);

  var iconFilePath = req.files['icon'][0].filename;
  var filePath = req.files['file'][0].filename;
  productService.addEducationalSources(productId, body, iconFilePath, filePath, req.user._id).then(function (result) {
    console.log(result);
    res.status(200).send(result);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send(err);
  });
}

function editEducationalSources(req, res, next) {
  var educationalSourceId = req.params.educationalSourceId;

  var body = _.pick(req.body, ['title', 'desc', 'fileType']);

  var iconFilePath = req.files['icon'][0].filename;
  var filePath = req.files['file'][0].filename;
  productService.editEducationalSources(educationalSourceId, body, iconFilePath, filePath, req.user._id).then(function (result) {
    return res.status(200).send(result);
  })["catch"](function (err) {
    return res.status(400).send(err);
  });
}

function getEducationalSources(req, res, next) {
  var productId = req.params.productId;
  productService.getEducationalSources(productId).then(function (result) {
    return res.status(200).send(result);
  })["catch"](function (err) {
    return res.status(400).send(err);
  });
}

function removeEducationalSources(req, res, next) {
  var educationalSourceId = req.params.educationalSourceId;
  productService.removeEducationalSources(educationalSourceId).then(function (result) {
    return res.status(200).send(result);
  })["catch"](function (err) {
    return res.status(400).send(err);
  });
} // #endregion
// #region Features 


function addFeatures(req, res, next) {
  var productId = req.params.productId;

  var body = _.pick(req.body, ['title', 'desc', 'featureKind']);

  var iconFilePath = req.files['icon'][0].filename;
  var imageFilePath = req.files['image'][0].filename;
  productService.addFeatures(productId, body, iconFilePath, imageFilePath, req.user._id).then(function (result) {
    console.log(result);
    res.status(200).send(result);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send(err);
  });
}

function editFeatures(req, res, next) {
  var featureId = req.params.featureId;

  var body = _.pick(req.body, ['title', 'desc', 'featureKind']);

  var iconFilePath = req.files['icon'][0].filename;
  var imageFilePath = req.files['image'][0].filename;
  console.log(featureId);
  productService.editFeatures(featureId, body, iconFilePath, imageFilePath, req.user._id).then(function (result) {
    return res.status(200).send(result);
  })["catch"](function (err) {
    return res.status(400).send(err);
  });
}

function getFeatures(req, res, next) {
  var productId = req.params.productId;
  productService.getFeatures(productId).then(function (result) {
    return res.status(200).send(result);
  })["catch"](function (err) {
    return res.status(400).send(err);
  });
}

function removeFeatures(req, res, next) {
  var featureId = req.params.featureId;
  productService.removeFeatures(featureId).then(function (result) {
    return res.status(200).send(result);
  })["catch"](function (err) {
    return res.status(400).send(err);
  });
} // #endregion
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


function addBanners(req, res, next) {
  var productId = req.params.productId;

  var body = _.pick(req.body, ['title', 'desc']);

  var filePath = req.file.filename;
  productService.addBanners(productId, body, filePath, req.user._id).then(function (result) {
    console.log(result);
    res.status(200).send(result);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send(err);
  });
}

function editBanners(req, res, next) {
  var bannerId = req.params.bannerId;

  var body = _.pick(req.body, ['title', 'desc']);

  var filePath = req.file.filename;
  productService.editBanners(bannerId, body, filePath, req.user._id).then(function (result) {
    return res.status(200).send(result);
  })["catch"](function (err) {
    return res.status(400).send(err);
  });
}

function getBanners(req, res, next) {
  var productId = req.params.productId;
  productService.getBanners(productId).then(function (result) {
    return res.status(200).send(result);
  })["catch"](function (err) {
    return res.status(400).send(err);
  });
}

function removeBanners(req, res, next) {
  var bannerId = req.params.bannerId;
  productService.removeBanners(bannerId).then(function (result) {
    return res.status(200).send(result);
  })["catch"](function (err) {
    return res.status(400).send(err);
  });
} // #endregion
// #region Technologies 


function addTechnologies(req, res, next) {
  var productId = req.params.productId;

  var body = _.pick(req.body, ['technologyId']);

  productService.addTechnologies(productId, body, req.user._id).then(function (result) {
    console.log(result);
    res.status(200).send(result);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send(err);
  });
}

function getTechnologies(req, res, next) {
  var productId = req.params.productId;
  productService.getTechnologies(productId).then(function (result) {
    return res.status(200).send(result);
  })["catch"](function (err) {
    return res.status(400).send(err);
  });
}

function removeTechnologies(req, res, next) {
  var technologyId = req.params.technologyId;
  var productId = req.params.productId;
  productService.removeTechnologies(productId, technologyId).then(function (result) {
    return res.status(200).send(result);
  })["catch"](function (err) {
    return res.status(400).send(err);
  });
} // #endregion


function removeKind(req, res, next) {
  var kindid = req.params.kindid;
  var productId = req.params.productId;
  productService.removeKind(productId, kindid).then(function (result) {
    return res.status(200).send(result);
  })["catch"](function (err) {
    return res.status(400).send(err);
  });
}

module.exports = router;