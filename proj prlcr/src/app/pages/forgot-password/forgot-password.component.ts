import { Component, Inject, OnInit, ViewChild, ElementRef,PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

import { BlockUiService } from "../../tools/blockui-service";
import { MetaService } from "../../tools/meta.service";
import { ApiService } from "../../Services/Api.Service";
import { AlertService } from "../../tools/alert.service";
import { HelperFunction } from "../../tools/helper-function";

@Component ({
    selector: 'app-forgot-password',
    styleUrls: ['./forgot-password.component.css'],
    templateUrl: './forgot-password.component.html',
})

/**
 * This class presented forgot password in page in `/forgot-password`
 */
export class ForgotPasswordComponent implements OnInit {

    @ViewChild('resendButton' , {static:false}) public resendButton: ElementRef;

    public forgotPasswordModel = {
        email: '',
    };
    public forgotPasswordError = {
        email: '',
    };
    public pageState:string = 'forgot';

    public resetPasswordModel = {
        code: '',
        new_password: '',
        retype_password: ''
    };
    public resetPasswordError = {
        code: '',
        new_password: '',
        retype_password: ''
    };

    constructor (public helper: HelperFunction,
                 private route: ActivatedRoute,
                 private router: Router,
                 private service: ApiService,
                 private alertService: AlertService,
                 private metaService: MetaService,
                 private blockUiService: BlockUiService,
                 @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
     * ngOnInit()
     */
    public ngOnInit() {
        if ( isPlatformBrowser(this.platformId) ) {
            window.scrollTo(0, 0);
        }
        this.blockUiService.unBlockPage();
        this.metaService.setTitle('Password Reset | Perfectlancer');
        this.metaService.setDescription('Reset your Password here and make your account more secure.');
        const pageParams = this.route.snapshot.queryParamMap;
        if ( pageParams.get('email') ) {
            this.forgotPasswordModel.email = pageParams.get('email');
        }
        const token = pageParams.get('token');
        if ( token ) {
            this.pageState = 'code';
            this.resetPasswordModel.code = token;
        }
        if ( this.pageState == 'code' && !this.forgotPasswordModel.email ) {
            this.alertService.alertError('Url is invalid.');
            this.router.navigateByUrl('/login');
        }
    }

    /**
     * This method will fire if user request for forgot password.
     * @param e
     */
    public onRequestClick(e) {
        e.preventDefault();
        if ( this.checkForgotPasswordValidation() ) {
            this.blockUiService.blockButton('.forgot-pass-page #request');
            this.service
                .sendForgetPassword(this.forgotPasswordModel)
                .subscribe(
                    res => {
                        this.alertService.alertSuccess('An email with change password token sent to your email address.');
                        this.blockUiService.unBlock('.forgot-pass-page #request');
                        this.router.navigateByUrl('/');
                    },
                    error => {
                        this.blockUiService.unBlock('.forgot-pass-page #request');
                        console.error(error);
                        if ( error.code == 404 ) {
                            this.forgotPasswordError.email = 'Email does not exist!';
                        } else {
                            this.forgotPasswordError.email = 'Somethings went wrong!';
                        }
                    });
        }

    }

    /**
     *
     */
    public onRequestResetPasswordClick() {

        if ( this.validateResetPassword() ) {
            let requestModel = {
                email: this.forgotPasswordModel.email,
                token: this.resetPasswordModel.code,
                password: this.resetPasswordModel.new_password
            };
            this.service
                .sendResetPassword(requestModel)
                .subscribe(
                    res => {
                        this.alertService.alertSuccess('Password successfully changed');
                        this.router.navigateByUrl('/login');
                    },
                    error => {
                        console.error(error);
                        if ( error.code == 401 ) {
                            this.resetPasswordError.new_password = 'Code is expired!';
                        } else {
                            this.alertService.alertError('Please check form and try again');
                        }
                    });
        }
    }

    /**
     * @returns {boolean}
     */
    private checkForgotPasswordValidation() {
        let valid = true;
        let errorMsg = '';
        if ( this.forgotPasswordModel.email == null || this.forgotPasswordModel.email.length == 0 ) {
            valid = false;
            errorMsg = 'Please enter your email address.';
        }
        if ( this.forgotPasswordModel.email !== null && this.forgotPasswordModel.email.indexOf('@') < 0 ) {
            valid = false;
            errorMsg = 'Please enter valid email.';
        }
        this.forgotPasswordError.email = errorMsg;
        return valid;
    }

    /**
     * @returns {boolean}
     */
    private validateResetPassword() {
        let valid = true;
        this.resetPasswordError = {
            code: '',
            new_password: '',
            retype_password: ''
        };
        if ( this.resetPasswordModel.new_password == null || this.resetPasswordModel.new_password.length == 0 ) {
            this.resetPasswordError.new_password = 'New password is required!';
            valid = false;
        }
        if ( this.resetPasswordModel.code == null || this.resetPasswordModel.code.length == 0 ) {
            this.resetPasswordError.code = "Code is required!";
            valid = false;
        }
        if ( this.resetPasswordModel.new_password !== this.resetPasswordModel.retype_password ) {
            this.resetPasswordError.retype_password = "Passwords doesn't match";
            valid = false;
        }
        return valid;
    }

}
