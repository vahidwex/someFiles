import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog  } from '@angular/material/dialog';

import { BidDialog } from "../../public-directives/bid-dialog/bid-dialog";

import { ApiService } from '../../Services/Api.Service';
import { AuthService } from "../../tools/auth-service";
import { AlertService } from "../../tools/alert.service";
import { BlockUiService } from "../../tools/blockui-service";

import { MetaService } from "../../tools/meta.service"

import { Api } from "../../Services/Api";

@Component({
    selector: 'app-projects',
    styleUrls: ['./projects.component.css'],
    templateUrl: './projects.component.html'
})

export class ProjectsComponent implements OnInit {

    public site_url = Api.WEBSITE_URL;
    public registerModel = {
        email: "",
        password: "",
        role: "employer"
    };
    public bookmarks = [];
    public registerError = {
        email: "",
        password: "",
        role: ""
    };

    public fileBaseAddress: string = Api.FILE_ADDRESS;
    public projectId: any = 0;
    public projects: any = [];
    public otherProjects : any = null;
    public user: any;

    constructor(public dialog: MatDialog,
                public router: Router,
                private service: ApiService,
                private route: ActivatedRoute,
                private alertService: AlertService,
                private blockUiService: BlockUiService,
                private authService: AuthService,
                private metaService: MetaService,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
     * ngOnInit()
     */
    public ngOnInit() {
        this.user = this.authService.getUser();
        this.route.paramMap.subscribe(param => {
            this.projectId = param.get('project_id');
            this.loadProjects();
        });
    }

    /**
     * This method will fire if user click to bid on project.
     */
    public onBidClick() {
        if ( this.authService.isUser() ) {
            this.openDialog(this.projects[0]);
        } else {
            this.router.navigate(['/login'], {queryParams: {redirect_link: this.router.url}});
        }
    }

    /**
     *
     */
    public postProjectLikeThis() {
        this.authService.setProjectLikeThis(this.projects[0]);
        this.router.navigateByUrl('/post-job');
    }

    /**
     *
     * @param e
     */
    public newWindowOpen(e) {
        window.open(e);
    }

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

    public bookmarkProject(id) {
        if ( this.user && this.user.role ) {
            const requestModel = {
                "bookmark_project_id": id
            };
            this.service
                .bookmark(requestModel)
                .subscribe(
                res => {
                    if ( !this.bookmarks.includes(id) ) {
                        if ( this.bookmarks && this.bookmarks.length == 0 ) {
                            this.bookmarks[0] = id;
                        } else {
                            this.bookmarks.push(id);
                        }
                    }
                },
                err => {
                    this.alertService.alertError(err.body.error);
                }
            );
        } else {
            this.alertService.alertWarn('You need to login or register to be able to bookmark projects.');
            this.router.navigate(['/login'], {queryParams: {redirect_link: this.router.url}});
        }
    }

    public unbookmarkProject(id) {
        if ( this.user && this.user.role ) {
            this.service.unbookmark(id)
                .subscribe(
                res => {
                    if ( this.bookmarks.includes(id) ) {
                        this.bookmarks.splice(this.bookmarks.lastIndexOf(id), 1);
                    }
                },
                err => {
                    this.alertService.alertError(err.body.error);
                }
            );
        }
    }

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
     *
     * @param project
     */
    public openDialog(project: any): void {
        const dialogRef = this.dialog.open(BidDialog, {
            width: '728px',
            height: '90%',
            data: project
        });

        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
        });
    }

    /**
     * Load project data
     */
    private loadProjects() {
        this.service
            .getProjectsById(this.projectId)
            .subscribe(
            res => {
                if ( res && res.length > 0 ) {
                    this.projects = res;
                    this.metaService.setTitle(this.projects[0].title.substring(0,33) + '.. | Perfectlancer');
        this.metaService.setDescription('You have been invited to this project. Please login and place a bid on this project. title : ' + this.projects[0].title);
                    this.loadOtherProjects();
                } else {
                    this.router.navigateByUrl('/404',{skipLocationChange: true});
                }
            },
            error => {
                console.error(error);
                this.router.navigateByUrl('/404',{skipLocationChange: true});
            }
        );
    }

    /**
     *
     */
    private loadOtherProjects() {
        if ( this.authService.isUser() ) {
            this.service
                .getOtherProjects(this.projects[0].user_id)
                .subscribe(
                    res => {
                        if ( res ) {
                            this.otherProjects = res;
                        }
                    },
                    error => {
                        console.error(error);
                    });
        }
    }

}

interface project {
    title: string;
    localOnly: string;
    description: string;
    createAt: string;
    skills: string[];
    rate: string;
    paymentVerify: boolean;
    numberOfProposals: string;
    totalSpent: string;
    projectType: string;
    budget: string;
    seniorityLevel: string;
    location: string;
}