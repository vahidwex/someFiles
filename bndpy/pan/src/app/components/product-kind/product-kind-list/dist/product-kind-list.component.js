"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductKindListComponent = void 0;
var core_1 = require("@angular/core");
var ProductKindListComponent = /** @class */ (function () {
    function ProductKindListComponent(route, router, bnService) {
        this.route = route;
        this.router = router;
        this.bnService = bnService;
    }
    ProductKindListComponent.prototype.ngOnInit = function () {
        this.getProductKinds();
    };
    ProductKindListComponent.prototype.addNew = function () {
        this.router.navigate(['new'], { relativeTo: this.route });
    };
    ProductKindListComponent.prototype.onEdit = function (id) {
        this.router.navigate([id], { relativeTo: this.route });
    };
    ProductKindListComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.bnService.deleteproductKind(id).subscribe(function (response) {
            _this.getProductKinds();
        });
    };
    ProductKindListComponent.prototype.getProductKinds = function () {
        var _this = this;
        this.bnService.getAll().subscribe(function (result) {
            _this.technologyKinds = result;
        });
    };
    ProductKindListComponent = __decorate([
        core_1.Component({
            selector: 'app-product-kind-list',
            templateUrl: './product-kind-list.component.html',
            styleUrls: ['./product-kind-list.component.css']
        })
    ], ProductKindListComponent);
    return ProductKindListComponent;
}());
exports.ProductKindListComponent = ProductKindListComponent;
