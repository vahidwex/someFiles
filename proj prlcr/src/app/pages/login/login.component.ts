import { Component, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { BlockUiService } from '../../tools/blockui-service';
import { TokenService } from '../../Services/token.service';
import { AlertService } from '../../tools/alert.service';
import { MetaService } from '../../tools/meta.service'
import { AuthService } from '../../tools/auth-service';
import { ApiService } from '../../Services/Api.Service';

@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html'
})

export class LoginComponent {

    @ViewChild('focusInput', {static: true}) focusInput: ElementRef;

    public loginModel = {
        username: '',
        password: '',
    };
    public loginError = {
        username: '',
        password: ''
    };
    readonly VAPID_PUBLIC_KEY = 'BMiVZAQkEuX6AnUeuRkdQn6GHm1gQiell32xLsDsdp_KcKmE3RdpTzjwQOr3646uylts28JSDnDRO8N23teO0Fo';
    public sub: PushSubscription;
    public redirectLink = null;
    public user = null;
    public logged = false;

    constructor(private tokenService: TokenService,
                private authService: AuthService,
                private route: ActivatedRoute,
                private router: Router,
                private service: ApiService,
                private alertService: AlertService,
                private metaService: MetaService,
                private blockUiService: BlockUiService,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
     * ngOnInit
     */
    public ngOnInit() {
        this.blockUiService.unBlockPage();
        this.metaService.setTitle('Log in | Perfectlancer - Hire Top Freelancers');
        this.metaService.setDescription('Log in to Perfectlancer.com and Start hiring top professionals or getting hired for top freelancing jobs by collaborating in the platform and searching for jobs most relevant to your expertise');
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
        this.logged = this.authService.isUser();
        this.user = this.authService.getUser();
        this.route.queryParamMap.subscribe(param => {
            if (param.get('redirect_link')) {
                this.redirectLink = param.get('redirect_link');
            }

        if (this.logged && this.redirectLink ) {
            this.router.navigate([this.redirectLink]);
        }else if (this.logged ){
            this.router.navigateByUrl('/panel/profile');
        }
        });
    }

    /**
     * This method will fire to call service and login user.
     *
     * @param e
     */
    public onLoginClick(e) {
        e.preventDefault();
        this.loginError = {
            username: '',
            password: ''
        };
        if ( this.checkFormValidation() ) {
            this.blockUiService.blockButton('#sign-in');
            this.tokenService
                .getNewToken(this.loginModel.username, this.loginModel.password)
                .subscribe(
                    response => this.onLoginSuccess(response),
                    error => this.onLoginError(error));
        }
    }

    /**
     * This method will validate form.
     *
     * @returns {boolean}
     */
    public checkFormValidation() {
        let valid = true;
        for ( let key in this.loginModel ) {
            if ( this.loginModel[key] == null || this.loginModel[key].length == 0 ) {
                this.loginError[key] = key + ' is required!';
                valid = false;
            }
        }
        return valid;
    }

    /**
     * This method will fire if user logged in successfully.
     *
     * @param res
     */
    private onLoginSuccess(res) {
        this.service
            .getUserDetails()
            .subscribe(
                response => this.onGetUserSuccess(response),
                error => this.onGetUserError(error));
    }

    /**
     * This method will fire if login failed.
     *
     * @param error
     */
    private onLoginError(error) {
        console.error(error);
        this.blockUiService.unBlock('#sign-in');
        this.loginError.password = error.body.message;
    }

    /**
     * This method will fire if user data loaded successfully.
     *
     * @param res
     */
    private onGetUserSuccess(res) {
        if (res) {
            this.authService.setUser(res);
            this.blockUiService.unBlock('#sign-in');
            this.alertService.alertSuccess('Welcome');
            // if ( this.swUpdate.isEnabled ) {
            //     //console.log('notif here!!');

            //     // this.swUpdate.available.subscribe(() => {
            //     //   if (confirm('New version available. Load New Version?')) {
            //     //     this.swPush.requestSubscription({
            //     //       serverPublicKey: this.VAPID_PUBLIC_KEY
            //     //     })
            //     //       .then(sub => {
            //     //
            //     //         this.sub = sub;
            //     //
            //     //
            //     //         //console.log('Notification Subscription: ', sub);
            //     //
            //     //         const notificationToken = {notification_token: sub};
            //     //         this.HTTP.post<any>('http://p-lancer.com:3000/web_notification', notificationToken, {});
            //     //         window.location.reload();
            //     //
            //     //       })
            //     //       .catch(err => console.error('Could not subscribe to notifications', err));
            //     //   }
            //     // });
            //     this.swPush.requestSubscription({
            //         serverPublicKey: this.VAPID_PUBLIC_KEY
            //     }).then(sub => {
            //             this.sub = sub;
            //             const notificationToken = {notification_token: sub};
            //             this.service.sendTokenNotif(notificationToken).subscribe();

            //         })
            //         .catch(err => console.error('Could not subscribe to notifications', err));
            // }

            let user = this.authService.getUser();
            let project = this.authService.getProject();
            if ( user && user.role == 'employer' ) {
                if ( project ) {
                    this.createProject(project);
                }
            }
            if ( user ) {
                if ( this.redirectLink ) {
                    this.router.navigate([this.redirectLink]);
                } else if ( user.role === 'employer' ) {
                    this.router.navigateByUrl('/panel/dashboard');
                } else {
                    this.router.navigateByUrl('/panel/profile');
                }
            }
        }
    }

    /**
     * This method will fire if user data doesn't load successfully.
     *
     * @param error
     */
    private onGetUserError(error) {
        console.error(error);
        this.blockUiService.unBlock('#sign-in');
        this.alertService.alertError('Internal Server Error');
    }

    /**
     * @param project
     */
    private createProject(project) {
        this.service
            .sendProject(project)
            .subscribe(
                res => {
                        this.authService.deleteProject();
                        this.router.navigateByUrl('/panel/my-project');
                        return;
                    },
                err => {
                        this.router.navigateByUrl('/panel/dashboard');
                        this.alertService.alertError('Project cannot posted now, Please try again later');
                    });
    }
}
