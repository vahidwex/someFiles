"use strict";
exports.__esModule = true;
exports.ProductModel = void 0;
var ProductModel = /** @class */ (function () {
    function ProductModel(_id, titleEnglish, logo, title, shortDesc, LongDesc, productKind, technologies, educationalSources, banners, advantages, features, modifiedLog) {
        this._id = _id;
        this.titleEnglish = titleEnglish;
        this.logo = logo;
        this.title = title;
        this.shortDesc = shortDesc;
        this.LongDesc = LongDesc;
        this.productKind = productKind;
        this.technologies = technologies;
        this.educationalSources = educationalSources;
        this.banners = banners;
        this.advantages = advantages;
        this.features = features;
        this.modifiedLog = modifiedLog;
    }
    return ProductModel;
}());
exports.ProductModel = ProductModel;
