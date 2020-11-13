"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ProductDetailsComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var env_1 = require("../../../shared/values/env");
var ProductDetailsComponent = /** @class */ (function () {
    function ProductDetailsComponent(platformId, ProductService, CapabilityService, SolutionService, route, EducationalSourcesService, TitleUtilityService) {
        var _this = this;
        this.platformId = platformId;
        this.ProductService = ProductService;
        this.CapabilityService = CapabilityService;
        this.SolutionService = SolutionService;
        this.route = route;
        this.EducationalSourcesService = EducationalSourcesService;
        this.TitleUtilityService = TitleUtilityService;
        this.env = env_1.ENV;
        this.product = "";
        this.kinds = [];
        this.advantages = [];
        this.banners = [];
        this.features = [];
        this.technologies = [];
        this.capabilities = [];
        this.customOptions = {
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: true,
            navSpeed: 700,
            margin: 30,
            responsive: {
                0: {
                    items: 2
                },
                400: {
                    items: 4
                },
                740: {
                    items: 6
                },
                940: {
                    items: 8
                }
            },
            nav: false
        };
        this.tabIndex = 0;
        this.SelectedImg = "";
        this.backgroundColor = 'primary';
        this.tabChanged = function (tabChangeEvent) {
            _this.tabIndex = tabChangeEvent.index;
        };
    }
    ProductDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.TitleUtilityService.add("محصولات");
        this.route.params.subscribe(function (_a) {
            var name = _a.name;
            _this.TitleUtilityService.add(name);
            _this.ProductService.GetProductByEnName(name).subscribe(function (res) {
                console.log(res);
                _this.product = res;
                _this.kinds = _this.product.productKind;
                _this.SelectedImg = _this.product.logo;
                _this.banners = _this.product.banners;
                _this.banners.push({
                    image: _this.product.logo,
                    title: _this.product.title
                });
                _this.advantages = _this.product.advantages;
                _this.features = _this.product.features;
                _this.technologies = _this.product.technologies;
                _this.EducationalSourcesService.GetEsByProductId(_this.product._id).subscribe(function (Esres) {
                    _this.educationalSources = Esres;
                });
            });
        });
        this.CapabilityService.GetAll().subscribe(function (res) {
            _this.capabilities = res;
        });
        this.ProductService.GetAll().subscribe(function (res) {
            _this.products = res;
        });
        this.SolutionService.GetAll().subscribe(function (res) {
            _this.solutions = res;
        });
    };
    ProductDetailsComponent.prototype.changeBanner = function (banner) {
        this.SelectedImg = banner;
        document.getElementById('selectedImage').classList.add('fadeIn');
        if (common_1.isPlatformBrowser(this.platformId)) {
            setTimeout(function () {
                document.getElementById('selectedImage').classList.remove('fadeIn');
            }, 500);
        }
    };
    ProductDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-product-details',
            templateUrl: './product-details.component.html',
            styleUrls: ['./product-details.component.scss']
        }),
        __param(0, core_1.Inject(core_1.PLATFORM_ID))
    ], ProductDetailsComponent);
    return ProductDetailsComponent;
}());
exports.ProductDetailsComponent = ProductDetailsComponent;
