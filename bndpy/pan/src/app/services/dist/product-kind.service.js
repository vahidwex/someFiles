"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductKindService = void 0;
var core_1 = require("@angular/core");
var env_consts_1 = require("src/app/shared/env-consts");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var ProductKindService = /** @class */ (function () {
    function ProductKindService(httpClient, auService) {
        this.httpClient = httpClient;
        this.auService = auService;
        this.ProductKindsChanged = new rxjs_1.Subject();
    }
    ProductKindService.prototype.getAll = function () {
        var req = this.httpClient.get('admin/productKinds/', {
            observe: 'body',
            responseType: 'json'
        });
        return req;
    };
    ProductKindService.prototype.getById = function (id) {
        var req = this.httpClient.get('admin/productKinds/' + id, {
            observe: 'body',
            responseType: 'json'
        });
        return req;
    };
    ProductKindService.prototype.addproductKind = function (productKind, file) {
        var body = new FormData();
        body.append('title', productKind.title);
        body.append('description', productKind.description);
        body.append('tags', productKind.tags);
        body.append('logo', file, file.name);
        var req = new http_1.HttpRequest('POST', 'admin/productKinds/create', body, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductKindService.prototype.updateproductKind = function (productKind, file, id) {
        var body = new FormData();
        var req;
        if (file) {
            body.append('title', productKind.title);
            body.append('description', productKind.description);
            body.append('tags', productKind.tags);
            body.append('logo', file, file.name);
            req = new http_1.HttpRequest('PATCH', 'admin/productKinds/edit/' + id, body, {
                reportProgress: true
            });
        }
        else if (productKind.logo.length > 0) {
            productKind.logo = productKind.logo.slice(env_consts_1.env.assestUrl.length, productKind.logo.length);
            req = new http_1.HttpRequest('PATCH', 'admin/productKinds/edit/' + id, productKind, {
                reportProgress: true
            });
        }
        return this.httpClient.request(req);
    };
    ProductKindService.prototype.deleteproductKind = function (id) {
        var req = new http_1.HttpRequest('DELETE', 'admin/productKinds/remove/' + id, null, {
            reportProgress: true
        });
        return this.httpClient.request(req);
    };
    ProductKindService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProductKindService);
    return ProductKindService;
}());
exports.ProductKindService = ProductKindService;
