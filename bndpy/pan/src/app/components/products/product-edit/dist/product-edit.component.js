"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductEditComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var env_consts_1 = require("src/app/shared/env-consts");
var ProductEditComponent = /** @class */ (function () {
    function ProductEditComponent(route, PKService, router, bnService) {
        this.route = route;
        this.PKService = PKService;
        this.router = router;
        this.bnService = bnService;
        this.product = { title: '', logo: '', shortDesc: '', LongDesc: '', productKind: '', titleEnglish: '' };
        this.editMode = false;
        this.kindz = [];
    }
    ProductEditComponent.prototype.ngOnInit = function () {
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
    ProductEditComponent.prototype.onUpload = function (files) {
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
        this.productForm.patchValue({ logo: this.file.name });
        this.product.logo = '';
    };
    ProductEditComponent.prototype.onBack = function () {
        if (this.editMode) {
            this.router.navigate(['../../'], { relativeTo: this.route });
        }
        else {
            this.router.navigate(['../'], { relativeTo: this.route });
        }
    };
    ProductEditComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.editMode) {
            // console.log(this.productForm)
            this.bnService.updateProduct(this.productForm.value, this.file, this.id)
                .subscribe(function (result) { _this.onBack(); }, function (error) { return console.log(error); });
        }
        else {
            this.bnService.addProduct(this.productForm.value, this.file)
                .subscribe(function (result) { _this.onCancel(); }, function (error) { return console.log(error); });
        }
    };
    ProductEditComponent.prototype.onCancel = function () {
        this.productForm.setValue({ title: '', logo: '', shortDesc: '', LongDesc: '', productKind: '', titleEnglish: '' });
        this.product.logo = '';
    };
    ProductEditComponent.prototype.setData = function () {
        var _this = this;
        if (this.editMode) {
            this.bnService.getById(this.id).subscribe(function (product) {
                product[0].productKind.forEach(function (element) {
                    _this.kindz.push(element);
                });
                // console.log('product of get: ', product);
                _this.product = product[0];
                _this.product.logo = env_consts_1.env.assestUrl + _this.product.logo;
                _this.productForm.setValue({
                    title: _this.product.title,
                    titleEnglish: _this.product.titleEnglish,
                    shortDesc: _this.product.shortDesc,
                    LongDesc: _this.product.LongDesc,
                    productKind: _this.product.productKind,
                    logo: _this.product.logo
                });
            });
        }
    };
    ProductEditComponent.prototype.getby = function () {
        var _this = this;
        this.bnService.getById(this.id).subscribe(function (product) {
            _this.kindz = [];
            product[0].productKind.forEach(function (element) {
                _this.kindz.push(element);
            });
        });
    };
    ProductEditComponent.prototype.removeProducts = function (id) {
        var _this = this;
        this.bnService.deleteProduct_productKind(this.id, id).subscribe(function (res) {
            _this.getby();
        });
    };
    ProductEditComponent.prototype.initForm = function () {
        var _this = this;
        this.PKService.getAll().subscribe(function (kinds) { return _this.kinds = kinds; });
        this.productForm = new forms_1.FormGroup({
            title: new forms_1.FormControl('', forms_1.Validators.required),
            titleEnglish: new forms_1.FormControl('', forms_1.Validators.required),
            logo: new forms_1.FormControl('', forms_1.Validators.required),
            shortDesc: new forms_1.FormControl('', forms_1.Validators.required),
            LongDesc: new forms_1.FormControl('', forms_1.Validators.required),
            productKind: new forms_1.FormControl('', forms_1.Validators.required)
        });
    };
    ProductEditComponent = __decorate([
        core_1.Component({
            selector: 'app-product-edit',
            templateUrl: './product-edit.component.html',
            styleUrls: ['./product-edit.component.css']
        })
    ], ProductEditComponent);
    return ProductEditComponent;
}());
exports.ProductEditComponent = ProductEditComponent;
