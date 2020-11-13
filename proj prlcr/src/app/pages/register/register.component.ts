import { Component, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

import { BlockUiService } from "../../tools/blockui-service";
import { TokenService } from "../../Services/token.service";
import { AlertService } from "../../tools/alert.service";
import { MetaService } from "../../tools/meta.service"
import { AuthService } from "../../tools/auth-service";
import { ApiService } from "../../Services/Api.Service";
import {HelperFunction} from "../../tools/helper-function";
import { StaticData } from "../../Services/static-data";

@Component({
    selector: 'app-register',
    styleUrls: ['./register.component.css'],
    templateUrl: './register.component.html'
})

export class RegisterComponent {

    @ViewChild('resendButton' , {static: true}) public resendButton: ElementRef;

    public registerModel = {
        email: "",
        password: "",
        role: "employer"
    };
    public registerError = {
        email: "",
        password: "",
        role: ""
    };
    public pageState:string = "register";
    public verifyRegisterModel = {
        role: '',
        email: '',
        session_challenge: '',
        token: '',
    };
    public userDataModel = {
        first_name: "",
        last_name: "",
        country: "",
        skills: [],
        user_skills: "",
    };
    public userDataError = {
        first_name: "",
        last_name: "",
        country: "",
        skills: "",
        user_skills: "",
    };
    public postProjectAction:boolean = false;
    public countries = StaticData.COUNTRIES;


    constructor (private router: Router,
                 private authService: AuthService,
                 private route: ActivatedRoute,
                 private tokenService: TokenService,
                 private service: ApiService,
                 private helper: HelperFunction,
                 private metaService: MetaService,
                 private alertService: AlertService,
                 private blockUiService: BlockUiService,
                 @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
     * ngOnInit()
     */
    public ngOnInit() {
        this.metaService.setTitle('Register | Perfectlancer.com');
        this.metaService.setDescription('Register on Perfectlancer and make money online by freelancing and working remotely. You can find high quality jobs as well as professional freelancers on Perfectlancer.com');
        if ( isPlatformBrowser(this.platformId) ) {
            window.scrollTo(0, 0);
        }
        let queryParam = this.route.snapshot.queryParamMap;
        let role = 'employer';
        if(this.router.url.includes('freelancer')){
            role = 'freelancer';
            this.metaService.setTitle('Register | Freelancer | Perfectlancer.com');
        }else if(this.router.url.includes('employer')){
            role = 'employer';
            this.metaService.setTitle('Register | Employer | Perfectlancer.com');
        }
        this.registerModel.role = role;
        this.verifyRegisterModel = {
            role: role.length != 0 ? role : queryParam.get('token') ? queryParam.get('token') : '',
            email: queryParam.get('email') ? queryParam.get('email') : '',
            session_challenge: queryParam.get('session_challenge') ? queryParam.get('session_challenge') : '',
            token: queryParam.get('token') ? queryParam.get('token') : '',
        };
        
        if( this.verifyRegisterModel.role &&
            this.verifyRegisterModel.token &&
            this.verifyRegisterModel.session_challenge ) {
            this.emailVerification();
        }
        this.blockUiService.unBlockPage();
        if ( this.authService.isUser() ) {
            let user = this.authService.getUser();
            if ( user && user.role == 'freelancer' ){
                if(user.skills.length < 3 || !user.first_name || !user.last_name || !user.country ){
                    this.pageState = 'complete';
                    return;
                }
                this.router.navigateByUrl('/panel/profile');
            } else {
                this.router.navigateByUrl('/panel/dashboard');
            }
        }
    }

    /**
     *
     * @param e
     * @param role
     * @param other
     * @constructor
     */
    public ChangeRoleView(e, role){
        e.stopPropagation();
        this.registerModel.role = role;
        if(role == 'employer'){
            this.metaService.setTitle('Register | Employer | Perfectlancer.com');
        }else if(role == 'freelancer'){
            this.metaService.setTitle('Register | Freelancer | Perfectlancer.com');
        }
        this.helper.changeRouteParams('register/' + role,[]);
    }

    sentEmail = true;

    /**
     * This method will fire if user click to register.
     *
     * @param e
     */
    public onSignUpClick(e) {
        e.preventDefault();
        if ( this.validateRegisterForm() ) {
            this.blockUiService.blockButton('#submit-register');
            this.service
                .registerUser(this.registerModel)
                .subscribe(
                    result => {
                        this.blockUiService.unBlock('#submit-register');
                        this.alertService.alertSuccess('An email with confirmation code sent to your email address.');
                        this.sentEmail = false;
                        // this.router.navigateByUrl('/');
                    },
                    error => {
                        console.log(error);
                        this.blockUiService.unBlock('#submit-register');
                        // validation from backend
                        for ( let key in this.registerError ) {
                            if ( error.body.error && error.body.error.info &&
                                error.body.error.info.messages && error.body.error.info.messages[key] &&
                                error.body.error.info.messages[key].length > 0 ) {
                                this.registerError[key] = error.body.error.info.messages[key][0];
                            }
                        }
                    });
        }
    }

    /**
     * @param e
     */
    public completeProfile(e){
        e.preventDefault();
        if ( this.validateUpdateProfile() ) {
            var skillmerge = '';
            this.userDataModel.skills.forEach(element => {
                if(skillmerge.length == 0){
                    skillmerge = element.value.replace(/[^a-zA-Z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
                }else{
                    skillmerge = skillmerge + ',' + element.value.replace(/[^a-zA-Z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
                }
            });
            let updateModel = {
                "skills": this.userDataModel.skills,
                "user_skills": skillmerge,
                'first_name': this.userDataModel.first_name,
                'last_name': this.userDataModel.last_name,
                'country': this.userDataModel.country
            };
            this.service
                .updateProfile(updateModel)
                .subscribe(
                    res => {
                        this.alertService.alertSuccess('Profile updated successfully.');
                        this.getUserDetails(true);
                    },
                    error => {
                        console.error(error);
                        // validation from backend
                        for ( let key in this.userDataError ) {
                            if ( error.body.errors &&  error.body.errors[key] &&
                                error.body.errors[key].length > 0 ) {
                                this.userDataError[key] = error.body.errors[key][0];
                            }
                        }
                    }
                );

        }
    }

    /**
     *
     */
    public emailVerification() {
        let verifyByEmail = {
          email: this.verifyRegisterModel.email,
          token: this.verifyRegisterModel.token,
          session_challenge: this.verifyRegisterModel.session_challenge,
        };
        if ( isPlatformBrowser(this.platformId) ) {
            this.blockUiService.blockButton('#verify-btn');
            this.service
                .verifyAccount(verifyByEmail)
                .subscribe(
                    result => {
                        this.pageState = 'complete';
                        this.tokenService.setToken(result.result);
                        this.getUserDetails();
                    },
                    error => {
                        this.blockUiService.unBlock('#verify-btn');
                        console.error(error);
                        let errorMsg = 'Verification not accepted';
                        if ( error.code == 404 ) {
                            errorMsg = 'Email does not found.';
                        }
                        this.alertService.alertError(errorMsg);
                    });
        }
    }

    /**
     * @param {boolean} redirect
     */
    private getUserDetails(redirect = false) {
        this.service.getUserDetails()
            .subscribe(
            res => {
                if ( res ) {
                    this.authService.setUser(res);
                    if ( redirect ) {
                        if ( this.postProjectAction ) {
                            this.router.navigateByUrl('/panel/my-project');
                        } else {
                            this.router.navigateByUrl('/panel/profile');
                        }
                        return;
                    }
                    this.alertService.alertSuccess('Your account verified successfully.');
                    this.blockUiService.unBlock('#verify-btn');
                    this.pageState = 'complete';
                    this.verifyRegisterModel.role = res.profile.role;
                    let user = this.authService.getUser();
                    let employerProject = this.authService.getProject();
                    if( user && user.role == 'employer' && employerProject ) {
                        this.postProject(employerProject);
                    }
                } else {
                    this.failedToLoadUser('No response');
                }
            },
            error => this.failedToLoadUser(error)
        );
    }

    /**
     * @param error
     */
    private failedToLoadUser(error) {
        console.error(error);
        this.blockUiService.unBlock('#verify-btn');
        this.tokenService.logOutUser();
        this.alertService.alertError('Authentication failed!');
        this.router.navigateByUrl('/login');
    }

    /**
     * Post project for employer if exist.
     *
     * @param employerProject
     */
    private postProject(employerProject) {
        this.postProjectAction = true;
        this.service.sendProject(employerProject)
            .subscribe(
            res => {
                this.authService.deleteProject();
                this.postProjectAction = true;
                return;
            },
            err => {}
        );
    }

    /**
     * Validate register form.
     *
     * @returns {boolean}
     */
    private validateRegisterForm() {
        this.registerError = {
            email: "",
            password: "",
            role: ""
        };
        let valid = true;
        if ( this.registerModel.email == null || this.registerModel.email.length == 0 ) {
            this.registerError.email = 'Email field is required';
            valid = false;
        }
        if ( this.registerModel.password == null || this.registerModel.password.length == 0 ) {
            this.registerError.password = 'Password is required';
            valid = false;
        }
        return valid;
    }

    /**
     * @returns {boolean}
     */
    private validateUpdateProfile() {
        this.userDataError = {
            first_name: "",
            last_name: "",
            country: "",
            skills: "",
            user_skills: "",
        };
        let valid = true;
        for ( let key in this.userDataModel ) {
            if ( typeof this.userDataModel[key] == "object" ) {
                if ( this.userDataModel[key].length < 3 && this.verifyRegisterModel.role == 'freelancer' ) {
                    this.userDataError[key] = 'At least 3 skills required!';
                    valid = false;
                }
            } else {
                if ( key !== 'user_skills' && this.userDataModel[key].length == 0 ) {
                    this.userDataError[key] = key + ' is required!';
                    valid = false;
                }
            }
        }
        return valid;
    }

}
