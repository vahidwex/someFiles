"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductsModule = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var products_component_1 = require("./products.component");
var product_edit_component_1 = require("./product-edit/product-edit.component");
var product_list_component_1 = require("./product-list/product-list.component");
var products_routing_module_1 = require("./products-routing.module");
var shared_module_1 = require("src/app/shared/shared.module");
var product_detail_component_1 = require("./product-detail/product-detail.component");
var product_technology_component_1 = require("./product-technology/product-technology.component");
var product_banner_component_1 = require("./product-banner/product-banner.component");
var product_advantage_component_1 = require("./product-advantage/product-advantage.component");
var product_educational_source_component_1 = require("./product-educational-source/product-educational-source.component");
var product_feature_component_1 = require("./product-feature/product-feature.component");
var ProductsModule = /** @class */ (function () {
    function ProductsModule() {
    }
    ProductsModule = __decorate([
        core_1.NgModule({
            declarations: [
                products_component_1.ProductsComponent,
                product_edit_component_1.ProductEditComponent,
                product_list_component_1.ProductListComponent,
                product_detail_component_1.ProductDetailComponent,
                product_technology_component_1.ProductTechnologyComponent,
                product_banner_component_1.ProductBannerComponent,
                product_advantage_component_1.ProductAdvantageComponent,
                product_educational_source_component_1.ProductEducationalSourceComponent,
                product_feature_component_1.ProductFeatureComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                products_routing_module_1.ProductsRoutingModule,
                shared_module_1.SharedModule
            ]
        })
    ], ProductsModule);
    return ProductsModule;
}());
exports.ProductsModule = ProductsModule;
