"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AboutUsComponent = void 0;
var core_1 = require("@angular/core");
var env_1 = require("../../../../shared/values/env");
var AboutUsComponent = /** @class */ (function () {
    function AboutUsComponent(SettingService, CapabilityService, CustomerService, TechnologyService, TitleUtilityService) {
        this.SettingService = SettingService;
        this.CapabilityService = CapabilityService;
        this.CustomerService = CustomerService;
        this.TechnologyService = TechnologyService;
        this.TitleUtilityService = TitleUtilityService;
        this.env = env_1.ENV;
        this.Settings = '';
        this.customOptions = {
            loop: true,
            mouseDrag: true,
            touchDrag: true,
            pullDrag: true,
            dots: false,
            navSpeed: 700,
            margin: 30,
            responsive: {
                0: {
                    items: 2
                },
                400: {
                    items: 3
                },
                740: {
                    items: 4
                },
                940: {
                    items: 6
                }
            },
            nav: false
        };
    }
    AboutUsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.TitleUtilityService.add("درباره ما");
        this.SettingService.GetAll().subscribe(function (res) {
            _this.Settings = res[0];
            _this.location = _this.Settings.location;
            _this.fax = _this.Settings.fax;
            _this.call = _this.Settings.tel;
            _this.mail = _this.Settings.email;
        });
        this.CapabilityService.GetAll().subscribe(function (res) {
            _this.Capabilitys = res;
        });
        this.CustomerService.GetAll().subscribe(function (res) {
            _this.Customers = res;
        });
        this.TechnologyService.GetAll().subscribe(function (res) {
            _this.Technologys = res;
        });
    };
    AboutUsComponent = __decorate([
        core_1.Component({
            selector: 'app-about-us',
            templateUrl: './about-us.component.html',
            styleUrls: ['./about-us.component.scss']
        })
    ], AboutUsComponent);
    return AboutUsComponent;
}());
exports.AboutUsComponent = AboutUsComponent;
