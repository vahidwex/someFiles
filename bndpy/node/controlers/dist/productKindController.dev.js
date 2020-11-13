"use strict";

var express = require('express');

var router = express.Router();

var productKindService = require('../services/productKindService');

var _require = require('../helper/uploadFile'),
    upload = _require.upload,
    oo = _require.oo;

var _require2 = require('../helper/authorization'),
    isPermit = _require2.isPermit;

var _ = require('lodash');

router.get("", isPermit("getproductKinds"), getAll);
router.get("/:id", isPermit("getproductKinds"), getById);
router.post("/create", isPermit("createproductKinds"), upload.single('logo'), create);
router.patch("/edit/:id", isPermit("editproductKinds"), upload.single('logo'), edit);
router["delete"]("/remove/:id", isPermit("removeproductKinds"), remove);

function getAll(req, res, next) {
  productKindService.getAll().then(function (data) {
    return res.status(200).send(data);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send(err);
  });
}

function getById(req, res, next) {
  var id = req.params.id;
  productKindService.getById(id).then(function (data) {
    return res.status(200).send(data);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send(err);
  });
}

function create(req, res, next) {
  var body = _.pick(req.body, ['title', 'tags', 'description']);

  console.log(req.body);
  var filePath = req.file.filename;
  var userId = req.user._id;
  productKindService.create(body, filePath, userId).then(function (data) {
    return res.status(200).send(data);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send(err);
  });
}

function remove(req, res, next) {
  var id = req.params.id;
  productKindService.remove(id).then(function (data) {
    return res.status(200).send(data);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send(err);
  });
}

function edit(req, res, next) {
  var body = _.pick(req.body, ['title', 'tags', 'logo', 'description']);

  req.file ? body.logo = req.file.filename : body.logo;
  var productKindId = req.params.id;
  var userId = req.user._id;
  productKindService.edit(body, productKindId, userId).then(function (data) {
    return res.status(200).send(data);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).send(err);
  });
}

module.exports = router;