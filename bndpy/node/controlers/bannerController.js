const express = require("express");
const router = express.Router();
const bannerService = require("../services/bannerService");

const {upload} = require('../helper/uploadFile');
const {isPermit} = require('../helper/authorization');
const _ = require('lodash');

router.get("/", isPermit("getBanners"), getAll);
router.get("/:id", isPermit("getBanners"), getById);
router.post("/create", isPermit("createBanners"),upload.single('image'), create);
router.patch("/edit/:id", isPermit("editBanners"),upload.single('image'), edit);
router.delete("/remove/:id", isPermit("removeBanners"), remove);

 

function getById(req,res,next){
  let id = req.params.id;
  bannerService.getById(id)
  .then(data => res.status(200).send(data))
  .catch(err =>{ console.log(err); res.status(400).send(err);});

}

function getAll(req, res, next) {
  bannerService
    .getAll()
    .then(data => res.status(200).send(data))
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
}
function create(req, res, next) {
  let body = _.pick(req.body, [  "title", "link", "description"]);
  let filePath = req.file.filename;
  let userId = req.user._id;

  bannerService
    .create(body,filePath, userId)
    .then(data => res.status(200).send(data))
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
}
function remove(req, res, next) {
  let id = req.params.id;
  bannerService
    .remove(id)
    .then(data => res.status(200).send(data))
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
}
function edit(req, res, next) {
  let body = _.pick(req.body, [  "title", "link", "description","image"]);
  req.file ? body.image =req.file.filename :body.image;
  let bannerId = req.params.id;
  let userId = req.user._id;
  console.log(body)
  bannerService
    .edit(body, bannerId, userId)
    .then(data => res.status(200).send(data))
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
}
module.exports = router;
