import { Component, OnInit, Inject, ViewChild,PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isPlatformBrowser } from "@angular/common";
import { HttpParams } from '@angular/common/http';

import { AuthService } from '../../tools/auth-service';
import { MetaService } from '../../tools/meta.service';
import { AlertService } from '../../tools/alert.service';
import { ApiService } from '../../Services/Api.Service';
import { MessageService } from "../../Services/message.service";

import { Api } from "../../Services/Api";
import { HelperFunction } from '../../tools/helper-function';

import {StaticData} from "../../Services/static-data";

export interface DialogData {
  animal: string;
  name: string;
  title: string;
  url: string;
  description: string;
}

@Component({
    selector: 'app-freelancer-public-profile',
    styleUrls: ['./freelancer-public-profile.component.css'],
    templateUrl: './freelancer-public-profile.component.html'
})

export class FreelancerPublicProfileComponent implements OnInit {

    @ViewChild('file', {static: false}) file;

    public files: Set<File> = new Set();
    public animal = '';
    public name = '';
    public first_name = '';
    public last_name = '';
    public phone_number = '';
    public user_country = '';
    public user_description = '';
    public user_skills = '';
    public user_state = '';
    public firstname = '';
    public lastname = '';
    public worksample = '';
    public country = '';
    public state = '';
    public skills = '';
    public description = '';
    public email = '';
    public phonenumber = '';
    public user_education = '';
    public workexprience = '';
    public education: any = '';
    public old_password = '';
    public new_password = '';
    public c_new_password = '';
    public reset_password = false;
    public time = 0;
    public changeEmail = false;
    public newcode = '';
    public user: any;
    public editEducation = false;
    public countries = StaticData.COUNTRIES;
    public updateAvatar = {
        avatar: {}
    };
    public updateModel = {
        // skills:'',
        first_name: '',
        last_name: '',
        phone: '',
        country: '',
        description: ''
    };
    public avatar = '';
    public addIdentifierModel: any;
    changetxt = 'change';
    public changePasswordModel: any;
    public tab = 'General';
    public addEduBtn = '+ Add education';
    public eduUniversity = '';
    public eduCountry = '';
    public eduStartyear = '';
    public eduTitle = '';
    public eduEndyear = '';
    public pageData = {
        applications: null,
        applicationsCount: 0,
        enquiresCount: 0,
        enquires: null,
        invoiceCount: 0,
        invoices: null,
        bidding: null,
    };
    public projects : any = [{}];
    public collapsed: any = [{}];
    public skillcollapsed: any = [{}];
    public httpParams: HttpParams;
    public userId ;
    public publicProfile : any = [] ;
    public rate = 'N/A';

    constructor(private router: Router,
                private route: ActivatedRoute,
                private authService: AuthService,
                private messageService: MessageService,
                private service: ApiService,
                private helper: HelperFunction,
                private alertService: AlertService,
                private metaService: MetaService,
                public dialog: MatDialog,
                @Inject(PLATFORM_ID) private platformId: Object) {
        this.httpParams = new HttpParams();
    }

    /**
     * ngOnInit()
     */
    public ngOnInit() {
        this.metaService.setTitle('Profile | Perfectlancer')
        this.metaService.setDescription('Find professional freelancers on Perfectlancer - a platform that has made connecting to the freelancers and finding jobseasier than ever before.')
        if ( isPlatformBrowser(this.platformId) ) {
            this.time = Date.now();
            setInterval(() => {
                this.time = Date.now()
            }, 30000);
            window.scrollTo(0, 0);
            if (document.getElementById('my-public-header')) {
                document.getElementById('my-public-header').style.backgroundColor = 'var(--dark-color)';
            }
            this.time = Date.now();
            setInterval(() => {
                this.time = Date.now()
            }, 30000);
            window.scrollTo(0, 0);
        }

        let queryParam = this.route.snapshot.queryParamMap;
        this.tab = queryParam.get('tab') ? queryParam.get('tab') : 'General';
        this.route.paramMap.subscribe(param => {
            if (param.get('user_id')) {
                this.userId = param.get('user_id');
                this.getProjects();
            } else {
                this.router.navigateByUrl('/');
            }
        });
        this.metaService.setTitle('Profile');
        this.service.getPublicProfile(this.userId)
            .subscribe(
            res => {
                if(res && res.length == 0){
                    this.router.navigateByUrl('/404', {skipLocationChange: true});
                    return;
                }
                if (res) {
                    this.publicProfile = res;
                    this.firstname = res.profile.first_name ? res.profile.first_name : '';
                    this.lastname = res.profile.last_name ? res.profile.last_name : '';
                    this.apply();
                    this.country = res.profile.country ? res.profile.country : '';
                    this.skills = res.profile.skills ? res.profile.skills : '';
                    this.rate = res.profile.rate ? res.profile.rate : 'N/A';
                    this.state = res.profile.state ? res.profile.state : '';
                    this.avatar = res.auth.avatar_url ? res.auth.avatar_url : '../../../assets/images/default-' + res.profile.user_id%12 + '.png';
                    this.education = res.profile.education ? res.profile.education : '';
                    this.description = res.profile.description ? res.profile.description : '';
                    this.worksample = res.profile.worksample ? res.profile.worksample : '';
                    this.first_name = this.firstname;
                    this.last_name = this.lastname;
                    this.phone_number = this.phonenumber;
                    this.user_education = res.profile.education ? res.profile.education : '';
                    this.workexprience = res.profile.workexprience ? res.profile.workexprience : '';
                    this.user_country = this.country;
                    this.user_description = this.description;
                    this.user_skills = this.skills;
                    this.user_state = this.state;
                    this.updateSchema();
                }
            },
            err => {
                console.error(err);
                this.alertService.alertError('Profile not found!');
                this.router.navigateByUrl('/404',{skipLocationChange: true});

            });
    }

    /**
     *
     * @param id
     * @returns {boolean}
     */
    public isCollapsed(id) {
        if ( this.collapsed[id] && this.collapsed[id].height == 'auto' ) {
            return true;
        }
        return false;
    }

    /**
    * @param value
    * @returns {string}
    */

    public countryName(value){
        for(let i = 0; i < this.countries.length; i++){
            if(this.countries[i].code.includes(value)){
                return this.countries[i].name;
            }
        }
    }

    /**
     *
     * @param id
     */
    public closeAllSection(id) {
        if ( this.collapsed[id] && this.collapsed[id].height == 'auto' ) {
            this.skillcollapsed[id] = {
                ['height']: '30.2px'
            };
            this.collapsed[id] = {
                ['height']: '25.5px'
            };
            setTimeout(() => {
                var elmnt = document.getElementById(id);
                elmnt.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 50);
        }
    }

    /**
     *
     * @param id
     */
    public collapseSection(id) {
        // var tmp : any = document.getElementById(id);
        if (this.collapsed[id] != undefined && this.collapsed[id].height == 'auto') {
        } else {
            this.collapsed = [{}];
            this.skillcollapsed = [{}];
            this.collapsed[id] = {
                ['height']: 'auto'
            };
            this.skillcollapsed[id] = {
                ['height']: 'auto'
            };
            setTimeout(() => {
                var elmnt = document.getElementById(id);
                elmnt.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 50);
        }
        // //console.log(tmp);
        // tmp.style.height = '100px !important';
        // //console.log(tmp);
    }

    /**
     *
     * @param e
     */
    public newWindowOpen(e) {
        window.open(e);
    }

    /**
     *
     * @param url
     * @param title
     * @param description
     */
    public openDialogView(url, title, description) {
        const dialogRef = this.dialog.open(PublicSampleViewDialog, {
            width: '728px',
            height:'80%',
            data: {title: title, description: description, url: url}
        });

        dialogRef.afterClosed().subscribe(result => {
            // this.worksample = result;
        });
    }

    private apply() {
        this.helper.changeRouteParams('/profile/' + this.userId + '/' + this.firstname.trim().replace(' ','-') + '-' + this.lastname[0].toUpperCase(), '');
    }

    /**
     *
     * @param tab
     */
    public changeTab(tab) {
        this.tab = tab;
        const queryParams: Params = {tab: tab};
        this.router.navigate(
            ['/profile/' + this.userId],
            {
                queryParams: queryParams,
                queryParamsHandling: 'merge',
            });
    }

    ////////////////////
    /**
     *
     */
    private getProjects() {
        this.service
            .getMyProjects(this.userId)
            .subscribe(
                res => {
                    if (res) {
                        this.projects = res;
                    }
                },
                err => {
                    this.alertService.alertError('No internet connection.');
                }
            );
    }

    /**
     *
     */
    private updateSchema() {
        let lastname = this.lastname.trim()
        let firstname = this.firstname.trim()
        let slug = firstname.charAt(0).toUpperCase().replace(' ','-') + firstname.slice(1) + '-' + lastname.charAt(0).toUpperCase()
        let jsonModel = {
            "@context": "http://schema.org",
            "@type": "ProfilePage",
            "image": this.avatar,
            "name": slug.replace('-',' ') + '.',
            "address": this.countryName(this.country),
            "url": Api.WEBSITE_URL + '/profile/' + this.userId + '/' + slug,
            "telephone": this.phone_number,
        };
        // TODO: after add rating add this
        // if ( this.agentData.agent.rate ) {
        //     jsonModel["aggregateRating"] = {
        //         "@type": "AggregateRating",
        //         "ratingValue": this.agentData.agent.rate.value,
        //         "reviewCount": this.agentData.agent.rate.total
        //     }
        // }
        this.messageService.send('jsonModel', jsonModel);
    }

}


@Component({
    templateUrl: 'public-sample-work-dialog.html',
    styleUrls: ['./public-sample-work-dialog.css'],
})
export class PublicSampleViewDialog {

    constructor(public dialogRef: MatDialogRef<PublicSampleViewDialog>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    /**
     *
     * @param e
     */
    public newWindowOpen(e) {
        window.open(e);
    }
    

    /**
     *
     */
    public onNoClick() {
        this.dialogRef.close();
    }

}
