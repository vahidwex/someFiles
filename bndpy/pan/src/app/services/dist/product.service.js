"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductService = void 0;
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var env_consts_1 = require("src/app/shared/env-consts");
var ProductService = /** @class */ (function () {
    function ProductService(httpClient, auService) {
        this.httpClient = httpClient;
        this.auService = auService;
        this.productsChanged = new rxjs_1.Subject();
    }
    ProductService.prototype.getAll = function () {
        var req = this.httpClient.get('admin/products/', {
            observe: 'body',
            responseType: 'json'
        });
        return req;
    };
    ProductService.prototype.getById = function (id) {
        var req = this.httpClient.get('admin/products/' + id, {
            observe: 'body',
            responseType: 'json'
        });
        return req;
    };
    ProductService.prototype.getAllEducationalSources = function () {
        var req = this.httpClient.get('admin/educationalSources/getEducationalSources', {
            observe: 'body',
            responseType: 'json'
        });
        return req;
    };
    ProductService.prototype.addProductIntoES = function (ProductId, esSourceId) {
        var req = this.httpClient.post('admin/educationalSources/addProductIntoES/' + ProductId, { esSourceId: esSourceId }, {
            observe: 'body',
            responseType: 'json'
        });
        return req;
    };
    ProductService.prototype.addProduct = function (product, file) {
        var body = new FormData();
        body.append('title', product.title);
        body.append('shortDesc', product.shortDesc);
        body.append('LongDesc', product.LongDesc);
        body.append('titleEnglish', product.titleEnglish);
        body.append('productKind', product.productKind);
        body.append('logo', file, file.name);
        var req = new http_1.HttpRequest('POST', 'admin/products/create', body, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductService.prototype.updateProduct = function (product, file, id) {
        var body = new FormData();
        var req;
        if (file) {
            body.append('title', product.title);
            body.append('shortDesc', product.shortDesc);
            body.append('LongDesc', product.LongDesc);
            body.append('logo', file, file.name);
            body.append('productKind', product.productKind);
            body.append('titleEnglish', product.titleEnglish);
            req = new http_1.HttpRequest('PATCH', 'admin/products/edit/' + id, body, {
                reportProgress: true
            });
        }
        else if (product.logo.length > 0) {
            product.logo = product.logo.slice(env_consts_1.env.assestUrl.length, product.logo.length);
            // console.log(product.logo);
            req = new http_1.HttpRequest('PATCH', 'admin/products/edit/' + id, product, {
                reportProgress: true
            });
        }
        return this.httpClient.request(req);
    };
    ProductService.prototype.deleteProduct = function (id) {
        var req = new http_1.HttpRequest('DELETE', 'admin/products/remove/' + id, null, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductService.prototype.deleteProductTechnologies = function (productId, techId) {
        var req = new http_1.HttpRequest('DELETE', 'admin/products/removeTechnologies/' + productId + '/' + techId, null, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductService.prototype.deleteProduct_productKind = function (productId, kindId) {
        var req = new http_1.HttpRequest('DELETE', 'admin/products/removekind/' + productId + '/' + kindId, null, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductService.prototype.addProductTechnologies = function (productId, techId) {
        var req = new http_1.HttpRequest('POST', 'admin/products/addTechnologies/' + productId, { technologyId: techId }, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductService.prototype.deleteProductBanners = function (productId, bannerId) {
        var req = new http_1.HttpRequest('DELETE', 'admin/products/removeBanners/' + bannerId, null, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductService.prototype.addProductBanners = function (banner, productId, file) {
        var body = new FormData();
        body.append('desc', banner.desc);
        body.append('title', banner.title);
        body.append('image', file, file.image);
        var req = new http_1.HttpRequest('POST', 'admin/products/addBanners/' + productId, body, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductService.prototype.deleteProductAdvantages = function (productId, advantageId) {
        var req = new http_1.HttpRequest('DELETE', 'admin/products/removeAdvantages/' + advantageId, null, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductService.prototype.addProductAdvantages = function (advantage, productId, fileImage, fileIcon) {
        var body = new FormData();
        body.append('desc', advantage.desc);
        body.append('title', advantage.title);
        body.append('image', fileImage, fileImage.name);
        body.append('icon', fileIcon, fileIcon.name);
        var req = new http_1.HttpRequest('POST', 'admin/products/addAdvantages/' + productId, body, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductService.prototype.deleteProductFeatures = function (productId, FeatureId) {
        var req = new http_1.HttpRequest('DELETE', 'admin/products/removeFeatures/' + FeatureId, null, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductService.prototype.addProductFeatures = function (feature, productId, fileImage, fileIcon) {
        var body = new FormData();
        body.append('desc', feature.desc);
        body.append('title', feature.title);
        body.append('featureKind', feature.featureKind);
        body.append('image', fileImage, fileImage.name);
        body.append('icon', fileIcon, fileIcon.name);
        var req = new http_1.HttpRequest('POST', 'admin/products/addFeatures/' + productId, body, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductService.prototype.deleteProductEducationalSources = function (productId, EducationalSourceId) {
        var req = new http_1.HttpRequest('DELETE', 'admin/educationalSources/removeEducationalSources/' + EducationalSourceId, null, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductService.prototype.addProductEducationalSources = function (feature, file, fileIcon) {
        var body = new FormData();
        body.append('desc', feature.desc);
        body.append('title', feature.title);
        body.append('fileType', feature.fileType);
        body.append('file', file, file.name);
        body.append('icon', fileIcon, fileIcon.name);
        var req = new http_1.HttpRequest('POST', 'admin/educationalSources/add', body, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductService.prototype.EditProductEducationalSources = function (feature, productId, file, fileIcon) {
        var body = new FormData();
        body.append('desc', feature.desc);
        body.append('title', feature.title);
        body.append('fileType', feature.fileType);
        body.append('file', file, file.name);
        body.append('icon', fileIcon, fileIcon.name);
        var req = new http_1.HttpRequest('PATCH', 'admin/educationalSources/edit/' + productId, body, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductService.prototype.removeFromProducts = function (productId, esId) {
        var req = new http_1.HttpRequest('DELETE', 'admin/educationalSources/removeFromProducts/' + productId, { esId: esId }, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductService = __decorate([
        core_1.Injectable()
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
