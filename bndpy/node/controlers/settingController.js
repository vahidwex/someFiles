const express = require('express');
const router = express.Router();
 
const settingService = require('../services/settingService');
const {upload} = require('../helper/uploadFile');
const {isPermit} = require('../helper/authorization');
const _ = require('lodash');

router.get("", isPermit("getSetting"), getAll);
router.post("/create", isPermit("createSetting"),upload.fields([{name : 'logo' ,maxCount :1 },{name: 'backGround' , maxCount :1}]), create);
router.patch("/edit/:id", isPermit("editSetting"),upload.fields([{name : 'logo' ,maxCount :1 },{name: 'backGround' , maxCount :1}]), edit);
 
router.post("/addAddress/:settingId", isPermit("editSetting") , addAddress);
router.post("/removeAddress/:addressId", isPermit("editSetting") , removeAddress);
router.post("/addSocialNetworks/:settingId", isPermit("editSetting"),upload.single('socialLogo') , addSocialNetworks);
router.post("/removeSocialNetworks/:socialNetworkId", isPermit("editSetting") , removeSocialNetworks);


function getAll(req,res,next){
    settingService.getAll()
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function create(req,res,next){
    let body = _.pick(req.body,[ 'abutUsPage','companyName','email','tel','fax','HeaderMessage','productHeader','abutUsFooter','location','downFooterText' ,'backGround']);
    if (req.files) {
      var filepath = req.files['logo'][0].filename
      
      var bg = req.files['backGround'][0].filename
    }
    
    let userId = req.user._id;
    console.log(body);
    
    settingService.create(body,filepath,bg,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
 
function edit(req,res,next){

    let body = _.pick(req.body,[ 'abutUsPage','companyName','email','tel','fax','HeaderMessage','productHeader','abutUsFooter','location','downFooterText','backGround','logo'  ]);
    
     let settingId=req.params.id;
    let userId = req.user._id;

    let backGroundFilePath
    let logoFilePath

    req.files ?  backGroundFilePath = req.files['backGround'][0].filename :backGroundFilePath=body.logo;
    req.files ? logoFilePath=req.files['logo'][0].filename :logoFilePath=body.backGround;

    

    
     settingService.edit(body,settingId,userId,logoFilePath,backGroundFilePath)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function addAddress(req,res,next){
    let body = _.pick(req.body,[ 'address','positionWidth','positionHeight' ]);
    let userId = req.user._id;
    let settingId = req.params.settingId
    settingService.addAddress(body,settingId,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function removeAddress(req,res,next){
    let id = req.params.addressId;
    settingService.removeAddress(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function addSocialNetworks(req,res,next){
    let body = _.pick(req.body,[ 'title','link'  ]);
    if (req.file) {
        body.socialLogo = req.file.filename;
    }

    let userId = req.user._id;
    let settingId = req.params.settingId
    settingService.addSocialNetworks(body,settingId ,userId)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
function removeSocialNetworks(req,res,next){
    let id = req.params.socialNetworkId;
    settingService.removeSocialNetworks(id)
    .then(data => res.status(200).send(data))
    .catch(err =>{ console.log(err); res.status(400).send(err);});

}
module.exports = router ;