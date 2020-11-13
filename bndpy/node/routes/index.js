var express = require("express");
var router = express.Router();
const db = require("../config/db");
const Product = db.Product;
// const solutionService = require("../services/solutionService");
// const solutionKindService = require("../services/solutionKindService");

const bannerService = require("../services/bannerService");
const productService = require("../services/productService");
const educationalSourcesService = require("../services/educationalSources");

const customerService = require("../services/customerService");
const settingService = require("../services/settingService");
const capabilityService = require("../services/capabilityService");
// const technology = require("../models/technology");
const technologyService = require("../services/technologyService");

const clientService = require("../services/clientService");
const discountService = require("../services/discountService");
const orderService = require("../services/orderService");
const transportService = require("../services/transportService");
const storeService = require("../services/storeService");
const productkindservice = require("../services/productKindService");
const uiUserService = require("../services/uiUserService");







/* GET home page. */
router.get("/", mainPage);

router.get("/justBanner", justBanner);
router.get("/getStores", getStores);
router.get("/findByStore/:PDK_ID", findByStore);


router.get("/justCustomers", justCustomers);
router.get("/GetaAllEducationalSources", GetaAlleducationalSources);
router.get("/products", productPage);
router.get("/products/:productName", productDetailPage);
// router.get("/solutions", solutionPage);
// router.get("/solutions/:solutionName", solutionDetailPage);
router.get("/aboutUs", aboutUs);
router.get("/aboutUs/capability", capabilityPage);
router.get("/getSetting", getSetting);
// router.get("/getsolutionKind", getSolutionKind);
router.get("/getProductByEnName/:productName", getProductByEnName);
router.get("/getEsByProductId/:productId", getByProductId);
// router.get("/getSolutionBySolutionName/:solutionName", getSolutionByName);
// router.get("/getSolutionKindByName/:name", GetSolutionKindByName);

router.get("/increaseView/:productId", increaseView);
router.get("/increaseLike/:productId", increaseLike);


router.get("/cerateDiscount", cerateDiscount);
router.get("/getAllProductKinds", getAllProductKinds);
router.get("/GetproductbyPKid/:id", GetproductbyPKid);





router.post("/cerateClient", cerateClient);
router.post("/cerateOrder", cerateOrder);
router.post("/productsOfBasket", productsOfBasket);
router.post("/checkToken", checkToken);
router.post("/getByToken", getByToken);

router.post("/createTransport", createTransport);
router.get("/getAllTransport", getAllTransport);
router.post("/updateTransport/:orderId", updateTransport);

router.post("/addUiUser", addUiUser);
router.post("/checkByToken", checkByToken);
router.post("/checkByUserPass", checkByUserPass);
router.post("/insertLike", insertLike);
router.post("/likedCheck", likedCheck);
router.post("/addComment/:prodId/:token", addComment);




async function addComment(req, res, next){
  const prodId=req.params.prodId;
  const token=req.params.token;

  await productService.addComment(prodId,req.body,token).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})

}

async function likedCheck(req, res, next){
  await uiUserService.likedCheck(req.body).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}
async function insertLike(req, res, next){
  await uiUserService.insertLike(req.body).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}

async function checkByToken(req, res, next){
  await uiUserService.checkByToken(req.body).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}

async function checkByUserPass(req, res, next){
  await uiUserService.checkByUserPass(req.body).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}
async function addUiUser(req, res, next){
  await uiUserService.create(req.body).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}

async function GetproductbyPKid(req, res, next){
  const id = req.params.id;
  await productService.GetproductbyPKid(id).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}
async function getAllProductKinds(req, res, next){
  await productkindservice.getAll().then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}

async function updateTransport(req, res, next){
  await orderService.updateTransport(req.params.orderId,req.body.transportId).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}

async function createTransport(req, res, next){
  await transportService.create(req.body).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}
async function getAllTransport(req, res, next){
  await transportService.getAll().then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}

async function cerateOrder(req, res, next){
  await orderService.create(req.body).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}
async function cerateClient(req, res, next){
  await clientService.create(req.body).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}

async function cerateDiscount(req, res, next){
  await discountService.create({"percent":req.body.percent}).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}
async function productsOfBasket(req, res, next){
  
  await productService.productsOfBasket(req.body).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}


async function getStores(req, res, next){
  
  await storeService.getAll().then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}
async function findByStore(req, res, next){
  const PDK_ID = req.params.PDK_ID;
  await productService.findByStore(PDK_ID).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}
async function checkToken(req, res, next){
  
  await clientService.checkToken(req.body).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}

async function getByToken(req, res, next){
  
  await clientService.getByToken(req.body).then(result=> res.status(200).send(result)).catch(err =>{res.status(400).send(err);console.log(err)})
}









async function justCustomers(req, res, next){
  await customerService.getAll().then(result => res.status(200).send(result)).catch(err =>res.status(400).send(err));
}


async function justBanner(req, res, next){
  await bannerService.getAll().then(result => res.status(200).send(result)).catch(err =>res.status(400).send(err));
}
async function getSetting(req, res, next){
  await settingService.getAll().then(result => res.status(200).send(result)).catch(err =>res.status(400).send(err));
}

async function getSolutionKind(req, res, next){
  await solutionKindService.getAll().then(result => res.status(200).send(result)).catch(err =>res.status(400).send(err));
}

async function getProductByEnName(req, res, next){
  const productName = req.params.productName;
  await productService.getByNameRef(productName).then(result => res.status(200).send(result)).catch(err =>res.status(400).send(err));
}

async function GetSolutionKindByName(req, res, next){
  const name = req.params.name;
  await solutionKindService.getByName(name).then(result => res.status(200).send(result)).catch(err =>res.status(400).send(err));
}

async function getAlltechnology(req, res, next){
  await technologyService.getAll().then(result => res.status(200).send(result)).catch(err =>res.status(400).send(err));
}


async function getByProductId (req,res,next){

  let productId = req.params.productId;
   
  await educationalSourcesService.getEducationalSourcesByProductId( productId )
  .then(result => res.status(200).send(result))
  .catch(err =>res.status(400).send(err));

}

async function getSolutionByName(req, res, next) {
  let solutionName = req.params.solutionName;

  res.send(await solutionService.getByNameRef(solutionName));
}


async function mainPage(req, res, next) {
  let solutionItems = await solutionService.getAll();
  let productItems = await productService.getAll();
  let bannerItems = await bannerService.getAll();
  let customerItems = await customerService.getAll();
  let settingItems = (await settingService.getAll())[0];
  let banners = [];

  bannerItems.forEach(banner => {
    let imageUrl = "../images/" + banner.image;
    banners.push({ image: imageUrl, h1: banner.title, p: banner.description });
  });

  res.render("./main-page/index", {
    banners: banners,
    settings: settingItems,
    products: productItems,
    solutions: solutionItems,
    customers: customerItems
  });
}

async function productPage(req, res, next) {
  const sort = {}
  if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try{
     let prod= await Product
     .find({})
      .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))
          .sort(sort)
            .exec()
            
     res.send(prod)
    }catch(e){
      console.log(e)
    }
  // res.send(await productService.getAll(sort));
}

async function increaseView(req, res, next) {
  let productId = req.params.productId;
  res.send(await productService.increaseView(productId));
}

async function increaseLike(req, res, next) {
  let productId = req.params.productId;
  res.send(await productService.increaseLike(productId));
}

async function GetaAlleducationalSources(req, res, next) {
  res.send(await educationalSourcesService.getAll());
}


async function productDetailPage(req, res, next) {
  let solutionItems = await solutionService.getAll();
  let productItems = await productService.getAll();
  let banners = [];
  const productName = req.params.productName;
  const productDetail = await productService.getByNameRef(productName);
  const bannerItems = productDetail[0].banners;
  const technologies = productDetail[0].technologies;
  const advantages = productDetail[0].advantages;
  const educationalSources = productDetail[0].educationalSources;
  const features = productDetail[0].features;

  const productCustomers = await customerService.getByProductId(
    productDetail[0]._id
  );

  let settingItems = (await settingService.getAll())[0];

  if (bannerItems) {
    bannerItems.forEach(banner => {
      let imageUrl = "../images/" + banner.image;
      banners.push({
        image: imageUrl,
        h1: banner.title,
        p: banner.description
      });
    });
  }

  res.render("./main-page/product-detail", {
    settings: settingItems,
    products: productItems,
    solutions: solutionItems,
    product: productDetail[0],
    banners: banners,
    technologies: technologies,
    customers: productCustomers,
    advantages: advantages,
    educationalSources: educationalSources,
    features: features
  });
}

async function solutionPage(req, res, next) {
  res.send(await solutionService.getAll());

}

async function solutionDetailPage(req, res, next) {
  let solutionItems = await solutionService.getAll();
  let solutionName = req.params.solutionName;
  let solutionDetail = await solutionService.getByNameRef(solutionName);
  let productItems = await solutionService.getSolutionProducts(solutionName);

  let settingItems = (await settingService.getAll())[0];

  res.render("./main-page/solution-detail", {
    settings: settingItems,
    products: productItems,
    solutions: solutionItems,
    solution: solutionDetail[0],
  });  
}

async function aboutUs(req, res, next) {}
async function technologyPage(req, res, next) {}
async function capabilityPage(req, res, next) {
  res.send(await capabilityService.getAll());
}

module.exports = router;
