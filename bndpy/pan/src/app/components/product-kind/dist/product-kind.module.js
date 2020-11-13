"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductKindModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var product_kind_routing_module_1 = require("./product-kind-routing.module");
var product_kind_list_component_1 = require("./product-kind-list/product-kind-list.component");
var product_kind_new_component_1 = require("./product-kind-new/product-kind-new.component");
var forms_1 = require("@angular/forms");
var ProductKindModule = /** @class */ (function () {
    function ProductKindModule() {
    }
    ProductKindModule = __decorate([
        core_1.NgModule({
            declarations: [product_kind_list_component_1.ProductKindListComponent, product_kind_new_component_1.ProductKindNewComponent],
            imports: [
                common_1.CommonModule,
                product_kind_routing_module_1.ProductKindRoutingModule,
                forms_1.ReactiveFormsModule,
            ]
        })
    ], ProductKindModule);
    return ProductKindModule;
}());
exports.ProductKindModule = ProductKindModule;
