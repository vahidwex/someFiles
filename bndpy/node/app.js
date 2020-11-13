require("dotenv").config({ path: "/bin/.env" });
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var _ = require("lodash");
let cors = require("cors");

const indexRouter = require("./routes/index");
const athenticateRouter = require("./controlers/login");
const rolesRouter = require("./controlers/roleController");
const usersRouter = require("./controlers/userController");
// const technologiesRouter = require("./controlers/technologyController");
// const technologyKindsRouter = require("./controlers/technologyKindController");
const productDetailsKind = require("./controlers/productDetailsKindController");
const productDetails = require("./controlers/productDetailsController");
const settingRouter = require("./controlers/settingController");
const productsRouter = require("./controlers/productController");
const customersRouter = require("./controlers/cutomerController");
const capabilitiesRouter = require("./controlers/capabilityController");
const capabilityKindsRouter = require("./controlers/capabilityKindController");
const bannersRouter = require("./controlers/bannerController");
// const featureKindsRouter = require("./controlers/featureKindController");
const educationalsources = require("./controlers/educationalSourcesController");
const productKindRouter = require("./controlers/productKindController");
const orderRouter = require("./controlers/orderController");
const transportRouter = require("./controlers/transportController");
const storeRouter = require("./controlers/storeContoroller");






var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use('/pugs',express.static(path.join(__dirname, "public","pug-bootstrap")));
app.use('/images',express.static(path.join(__dirname, "public","images","uploads")));
 
 
app.use(
  cors({
    exposedHeaders: ["Content-Length", "x-auth"]
  })
); // TODO: remove from production env

app.use("/", indexRouter);
app.use("/admin", athenticateRouter);
app.use("/admin/roles", rolesRouter);
app.use("/admin/users", usersRouter);
// app.use("/admin/technologies", technologiesRouter);
// app.use("/admin/technologyKinds", technologyKindsRouter);
app.use("/admin/productDetailsKind", productDetailsKind);
app.use("/admin/productDetails", productDetails);
app.use("/admin/setting", settingRouter);
app.use("/admin/products", productsRouter);
app.use("/admin/customers", customersRouter);
app.use("/admin/capabilities", capabilitiesRouter);
app.use("/admin/capabilityKinds", capabilityKindsRouter);
app.use("/admin/banners", bannersRouter);
app.use("/admin/stores",storeRouter);
app.use("/admin/educationalSources",educationalsources);
app.use("/admin/productKinds",productKindRouter);
app.use("/admin/order",orderRouter);
app.use("/admin/transport",transportRouter);






app.use(function(req, res, next) {
  next(createError(404));
});
  
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render("error");
});

module.exports = app;
