"use strict";

require("dotenv").config({
  path: "/bin/.env"
});

var createError = require("http-errors");

var express = require("express");

var path = require("path");

var cookieParser = require("cookie-parser");

var logger = require("morgan");

var _ = require("lodash");

var cors = require("cors");

var indexRouter = require("./routes/index");

var athenticateRouter = require("./controlers/login");

var rolesRouter = require("./controlers/roleController");

var usersRouter = require("./controlers/userController");

var technologiesRouter = require("./controlers/technologyController");

var technologyKindsRouter = require("./controlers/technologyKindController");

// var solutionsRouter = require("./controlers/solutionController");

// var solutionKinsRouter = require("./controlers/solutionKindController");

var settingRouter = require("./controlers/settingController");

var productsRouter = require("./controlers/productController");

var customersRouter = require("./controlers/cutomerController");

var capabilitiesRouter = require("./controlers/capabilityController");

var capabilityKindsRouter = require("./controlers/capabilityKindController");

var bannersRouter = require("./controlers/bannerController");

var featureKindsRouter = require("./controlers/");

var educationalsources = require("./controlers/educationalSourcesController");

var productKindRouter = require("./controlers/productKindController");

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, "public")));
app.use('/pugs', express["static"](path.join(__dirname, "public", "pug-bootstrap")));
app.use('/images', express["static"](path.join(__dirname, "public", "images", "uploads")));
app.use(cors({
  exposedHeaders: ["Content-Length", "x-auth"]
})); // TODO: remove from production env

app.use("/", indexRouter);
app.use("/admin", athenticateRouter);
app.use("/admin/roles", rolesRouter);
app.use("/admin/users", usersRouter);
app.use("/admin/technologies", technologiesRouter);
app.use("/admin/technologyKinds", technologyKindsRouter);
app.use("/admin/solutions", solutionsRouter);
app.use("/admin/solutionKinds", solutionKinsRouter);
app.use("/admin/setting", settingRouter);
app.use("/admin/products", productsRouter);
app.use("/admin/customers", customersRouter);
app.use("/admin/capabilities", capabilitiesRouter);
app.use("/admin/capabilityKinds", capabilityKindsRouter);
app.use("/admin/banners", bannersRouter);
app.use("/admin/featureKinds", featureKindsRouter);
app.use("/admin/educationalSources", educationalsources);
app.use("/admin/productKinds", productKindRouter);
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; // render the error page

  res.status(err.status || 500); //res.render("error");
});
module.exports = app;