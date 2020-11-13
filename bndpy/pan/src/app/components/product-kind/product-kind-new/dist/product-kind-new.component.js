"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductKindNewComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var env_consts_1 = require("src/app/shared/env-consts");
var ProductKindNewComponent = /** @class */ (function () {
    function ProductKindNewComponent(route, router, skService) {
        this.route = route;
        this.router = router;
        this.skService = skService;
        this.productKind = { title: '', logo: '', tags: '', description: '' };
        this.editMode = false;
    }
    ProductKindNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.route.snapshot.params.id;
        this.initForm();
        this.route.params
            .subscribe(function (params) {
            _this.id = params.id;
            _this.editMode = params.id != null;
            _this.setData();
        });
    };
    ProductKindNewComponent.prototype.onUpload = function (files) {
        var _this = this;
        if (files.length === 0) {
            return;
        }
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = 'Only logos are supported.';
            return;
        }
        var reader = new FileReader();
        this.logoPath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = function (_event) {
            _this.imgURL = reader.result;
        };
        this.file = files[0];
        this.productKindForm.patchValue({ logo: this.file.name });
        this.productKind.logo = '';
    };
    ProductKindNewComponent.prototype.onBack = function () {
        if (this.editMode) {
            this.router.navigate(['../../'], { relativeTo: this.route });
        }
        else {
            this.router.navigate(['../'], { relativeTo: this.route });
        }
    };
    ProductKindNewComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.editMode) {
            console.log(this.productKindForm);
            this.skService.updateproductKind(this.productKindForm.value, this.file, this.id)
                .subscribe(function (result) { return _this.onBack(); }, function (error) { return console.log(error); });
        }
        else {
            this.skService.addproductKind(this.productKindForm.value, this.file)
                .subscribe(function (result) { return _this.onCancel(); }, function (error) { return console.log(error); });
        }
    };
    ProductKindNewComponent.prototype.onCancel = function () {
        this.productKindForm.setValue({ title: '', logo: '', tags: '', description: '' });
        this.productKind.logo = '';
    };
    ProductKindNewComponent.prototype.setData = function () {
        var _this = this;
        if (this.editMode) {
            this.skService.getById(this.id).subscribe(function (solutionKind) {
                console.log('solutionKind of get: ', solutionKind);
                _this.productKind = solutionKind[0];
                _this.productKind.logo = env_consts_1.env.assestUrl + _this.productKind.logo;
                _this.productKindForm.setValue({
                    title: _this.productKind.title,
                    description: _this.productKind.description,
                    tags: _this.productKind.tags,
                    logo: _this.productKind.logo
                });
            });
        }
    };
    ProductKindNewComponent.prototype.initForm = function () {
        this.productKindForm = new forms_1.FormGroup({
            title: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            logo: new forms_1.FormControl('', forms_1.Validators.required),
            tags: new forms_1.FormControl('', forms_1.Validators.required)
        });
    };
    ProductKindNewComponent = __decorate([
        core_1.Component({
            selector: 'app-product-kind-new',
            templateUrl: './product-kind-new.component.html',
            styleUrls: ['./product-kind-new.component.css']
        })
    ], ProductKindNewComponent);
    return ProductKindNewComponent;
}());
exports.ProductKindNewComponent = ProductKindNewComponent;
