import { Component, OnInit, Inject, ViewChild, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { isPlatformBrowser } from "@angular/common";
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';

import { BlockUiService } from '../../tools/blockui-service';
import { AuthService } from '../../tools/auth-service';
import { MetaService } from '../../tools/meta.service';
import { AlertService } from '../../tools/alert.service';
import { UploadService } from '../../Services/upload.service';
import { ApiService } from '../../Services/Api.Service';
import { HelperFunction } from '../../tools/helper-function';

import { StaticData } from "../../Services/static-data";

export interface DialogData {
    animal: string;
    name: string;
    title: string;
    url: string;
    description: string;
}

@Component({
    selector: 'app-freelancer-profile',
    styles: [`
        /deep/ .ng-tns-c5-0.ng-trigger.ng-trigger-animation.ng-star-inserted {
            border-radius: 7px;
        }
    `],
    templateUrl: './freelancer-profile.component.html',
    styleUrls: ['./freelancer-profile.component.css']
})

export class FreelancerProfileComponent implements OnInit {
    @ViewChild('file', {static: false}) file;
    public files: Set<File> = new Set();

    public animal = '';
    public name = '';
    public first_name = '';
    public last_name = '';
    public phone_number = '';
    public user_country = '';
    public user_description = '';
    public user_skills: any = '';
    public user_state = '';
    public firstname = '';
    public lastname = '';
    public worksample: any = '';
    public country = '';
    public state = '';
    public skills: any = '';
    public description = '';
    public generalEdit = false;
    public email = '';
    public newemail = '';
    public phonenumber = '';
    public education: any = [{}];
    public old_password = '';
    public new_password = '';
    public c_new_password = '';
    public editmail = false;
    public editphone = false;
    public reset_password = false;
    public time = 0;
    public changeEmail = false;
    public newcode = '';
    public countries = StaticData.COUNTRIES;
    public user: any;
    public editEducation = false;
    public updateAvatar = {
        avatar: {}
    };
    public uniFlag = false;
    public countryFlag = false;
    public startFlag = false;
    public endFlag = false;
    public titleFlag = false;
    public updateModel = {
        user_skills: '',
        skills: [{}],
        first_name: '',
        last_name: '',
        state: '',
        phone: '',
        country: '',
        description: ''
    };
    public avatar = '';
    public addIdentifierModel: any;
    public changetxt = 'change';
    public changePasswordModel: any;
    public tab = 'General';
    public addEduBtn = '+ Add education';
    public addExBtn = '+ Add Work experience';
    public eduUniversity = '';
    public eduCountry = '';
    public eduStartyear = '';
    public eduTitle = '';
    public noweditting = '';
    public eduEndyear = '';
    public nowedittingexprience = '';
    public editExprience = false;
    public workTitle = '';
    public workCompany = '';
    public workStart = '';
    public workEnd = '';
    public workCountry = '';
    public editModeexprience = false;
    public addModeexprience = false;
    public exCompany = '';
    public exCountry = '';
    public exStartyear = '';
    public exTitle = '';
    public exEndyear = '';
    public excompanyFlag = false;
    public excountryFlag = false;
    public exstartFlag = false;
    public exendFlag = false;
    public extitleFlag = false;
    public workexprience: any = [{}];
    public editMode = false;
    public addMode = false;
    public pageData = {
        applications: null,
        applicationsCount: 0,
        enquiresCount: 0,
        enquires: null,
        invoiceCount: 0,
        invoices: null,
        bidding: null,
    };
    public completeProfile = 0;
    public profileLevel = 'starter';
    public myControl = new FormControl();
    public options: string[] = ['One', 'Two', 'Three'];
    public filteredOptions: Observable<string[]>;
    public rate = 'N/A';
    public total_bid = 0;
    public remain_bid = NaN;
    public total_bid_extra = 0;
    public remain_bid_extra = 0;
    public oldsamples: any = null;
    public validators = [this.endsWith$];
    public errorMessages = {
        'endsWith$': 'Skill cant be less than 3 characters',
        'maxSkills': 'Cant add more than 20 skills'
    };

    constructor(private router: Router,
                private route: ActivatedRoute,
                private authService: AuthService,
                private service: ApiService,
                private blockUiService: BlockUiService,
                private alertService: AlertService,
                private metaService: MetaService,
                public dialog: MatDialog,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    public ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
        this.blockUiService.blockPage();
        let queryParam = this.route.snapshot.queryParamMap;
        this.tab = queryParam.get('tab') ? queryParam.get('tab') : 'General';

        this.metaService.setTitle('Dashboard');

        if (isPlatformBrowser(this.platformId)) {


            this.time = Date.now();
            setInterval(() => {
                this.time = Date.now()
            }, 30000)
            window.scrollTo(0, 0);


            this.service
                .getUserDetails()
                .subscribe(
                    res => {
                        if (res) {
                            this.authService.setUser(res);
                        }
                    },
                    err => {
                        console.error(err);
                        this.alertService.alertError('Internal Server Error');
                    }
                );
            this.user = this.authService.getUser();

            this.checkBid();

            this.firstname = this.user.first_name ? this.user.first_name : '';
            this.lastname = this.user.last_name ? this.user.last_name : '';
            this.country = this.user.country ? this.user.country : '';
            this.skills = this.user.skills ? this.user.skills : '';
            this.rate = this.user.rate;
            this.state = this.user.state ? this.user.state : '';
            this.avatar = this.user.avatar ? this.user.avatar : '../../../assets/images/default-' + this.user.user_id%12 + '.png';
            if(!this.user.avatar){
                this.completeProfile++;
            }
            this.education = this.user.education ? this.user.education : [];
            if (this.education.length == 0) {
                this.completeProfile++;
            }
            this.description = this.user.description ? this.user.description : '';
            if (this.description.length == 0) {
                this.completeProfile++;
            }
            this.email = this.user.emails[0].value ? this.user.emails[0].value : '';
            this.phonenumber = this.user.phone ? this.user.phone : '';
            this.worksample = this.user.worksample ? this.user.worksample : '';
            this.workexprience = this.user.workexprience ? this.user.workexprience : [];
            if (this.workexprience.length == 0) {
                this.completeProfile++;
            }
            this.first_name = this.firstname;
            this.last_name = this.lastname;
            this.phone_number = this.phonenumber;
            this.user_country = this.country;
            this.user_description = this.description;
            this.user_skills = this.skills;
            // this.user_skills = [{display:'html',value:'html'},{display:'css',value:'css'}];
            this.user_state = this.state;

            if (queryParam.get('settings') == 'true') {
                this.openSetting();
            }
            if(this.completeProfile < 1){
                this.profileLevel = "Complete";
            }else if (this.completeProfile < 2) {
                this.profileLevel = "Sr. Member";
            } else if (this.completeProfile < 3) {
                this.profileLevel = "Member";
            } else if (this.completeProfile < 4) {
                this.profileLevel = "Jr. Member";
            } else {
                this.profileLevel = "Newbie";
            }
            this.blockUiService.unBlockPage();
        }
    }

    public openDialog(): void {
        const dialogRef = this.dialog.open(DialogSampleWork, {
            width: '728px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.worksample) {
                this.worksample = result.worksample;
            }
        });
    }

    public openSetting() {
        this.tab = 'General';
        this.generalEdit = true;
        this.firstname = this.user.first_name ? this.user.first_name : '';
        this.lastname = this.user.last_name ? this.user.last_name : '';
        this.country = this.user.country ? this.user.country : '';
        this.skills = this.user.skills ? this.user.skills : '';
        this.state = this.user.state ? this.user.state : '';
        this.description = this.user.description ? this.user.description : '';
    }

    public openBuyBidDialog(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        const dialogRef = this.dialog.open(BuyBidProfileDialog, {
            width: '728px',
            height: 'auto',
            data: this.user.first_name
        });

        dialogRef.afterClosed().subscribe(result => {
            this.checkBid();
            // //console.log('The dialog was closed');
        });
    }

    public openDialogView(url, title, description): void {
        //console.log(url + title + description);
        const dialogRef = this.dialog.open(DialogSampleWorkView, {
            width: '728px',
            data: {title: title, description: description, url: url}
        });

        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
            // this.worksample = result;
        });
    }

    public changeEmailStatus() {
        this.changeEmail = !this.changeEmail;
        if (this.changeEmail) {
            this.addIdentifierProfileClick();

        } else {
            this.changetxt = 'change';
        }
    }

    public removeWorkSample(worksample, i) {
        this.oldsamples = this.authService.getUser().worksample ? this.authService.getUser().worksample : [];
        this.oldsamples.splice(i, 1);

        var updateModel = {
            worksample: this.oldsamples
        };

        this.service
            .updateProfile(updateModel)
            .subscribe(
                res => {
                    this.alertService.alertSuccess('update successfull');
                    this.service.getUserDetails()
                        .subscribe(
                            res => {
                                if (res) {
                                    this.authService.setUser(res);
                                    this.worksample = updateModel.worksample;
                                }
                            },
                            err => {
                                console.error(err);
                                this.alertService.alertError('Internal Server Error');
                            }
                        );
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }

    public changeTab(tab) {
        this.tab = tab;
        this.generalEdit = false;
        this.firstname = this.user.first_name ? this.user.first_name : '';
        this.lastname = this.user.last_name ? this.user.last_name : '';
        this.country = this.user.country ? this.user.country : '';
        this.skills = this.user.skills ? this.user.skills : '';
        this.state = this.user.state ? this.user.state : '';
        this.description = this.user.description ? this.user.description : '';
        const queryParams: Params = {tab: tab};
        this.router.navigate(
            ['/panel/profile'],
            {
                queryParams: queryParams,
                queryParamsHandling: 'merge',
            });
    }

    public complete() {
        document.getElementById('completeSign').style.width = '800px';
        document.getElementById('completeSign').style.height = '800px';
        setTimeout(() => {
            document.getElementById('completeSign').style.width = '0px';
            document.getElementById('completeSign').style.height = '0px';
        }, 900);
    }

    public changeComplete() {
        if(this.completeProfile < 1){
            this.profileLevel = "Complete";
        }else if (this.completeProfile < 2) {
            this.profileLevel = "Sr. Member";
        } else if (this.completeProfile < 3) {
            this.profileLevel = "Member";
        } else if (this.completeProfile < 4) {
            this.profileLevel = "Jr. Member";
        } else {
            this.profileLevel = "Newbie";
        }
    }

    public editEducationClick(education) {
        this.addEduBtn = 'Save education';
        this.noweditting = education;
        this.editMode = true;
        this.eduUniversity = education.university;
        this.eduCountry = education.country;
        this.eduStartyear = education.start;
        this.eduTitle = education.title;
        this.eduEndyear = education.end;
    }

    public editExprienceClick(exprience) {
        this.addExBtn = 'Save education';
        this.nowedittingexprience = exprience;
        this.editModeexprience = true;
        this.exCompany = exprience.company;
        this.exCountry = exprience.country;
        this.exStartyear = exprience.start;
        this.exTitle = exprience.title;
        this.exEndyear = exprience.end;
    }

    public filterStart(e) {
        this.eduStartyear = this.eduStartyear.replace(/[^0-9]/g, '');
        e.target.value = this.eduStartyear;
    }

    public filterEnd(e) {
        this.eduEndyear = this.eduEndyear.replace(/[^0-9]/g, '');
        e.target.value = this.eduEndyear;
    }

    public filterexStart(e) {
        this.exStartyear = this.exStartyear.replace(/[^0-9]/g, '');
        e.target.value = this.exStartyear;
    }

    public filterexEnd(e) {
        this.exEndyear = this.exEndyear.replace(/[^0-9]/g, '');
        e.target.value = this.exEndyear;
    }

    public changeExprience() {
        if (this.exCompany.length < 3 || this.exTitle.length < 3 || this.exCountry.length < 2 || this.exStartyear.length < 4 || this.exEndyear.length < 4 || this.exEndyear < this.exStartyear) {
            this.excompanyFlag = true;
            this.excountryFlag = true;
            this.exstartFlag = true;
            this.exendFlag = true;
            this.extitleFlag = true;
            this.alertService.alertError('fix errors first.');
            return;
        }
        if (this.addModeexprience) {
            if (this.workexprience.length == 0) {
                this.workexprience[0] = {
                    company: this.exCompany,
                    title: this.exTitle,
                    country: this.exCountry,
                    start: this.exStartyear,
                    end: this.exEndyear
                };
                this.completeProfile--;
                this.complete();
                this.changeComplete();
            } else {
                this.workexprience.push({
                    company: this.exCompany,
                    title: this.exTitle,
                    country: this.exCountry,
                    start: this.exStartyear,
                    end: this.exEndyear
                });
            }
            this.service
                .updateProfile({workexprience: this.workexprience})
                .subscribe(
                    res => {
                        this.alertService.alertSuccess('Work experience added!');
                        this.service.getUserDetails()
                            .subscribe(
                                res => {
                                    if (res) {
                                        this.authService.setUser(res);
                                        this.nowedittingexprience = '';
                                        this.editModeexprience = false;
                                        this.addModeexprience = false;
                                        this.exCompany = '';
                                        this.exCountry = '';
                                        this.exStartyear = '';
                                        this.exTitle = '';
                                        this.exEndyear = '';
                                        this.excompanyFlag = false;
                                        this.excountryFlag = false;
                                        this.exstartFlag = false;
                                        this.exendFlag = false;
                                        this.extitleFlag = false;
                                    }
                                },
                                err => {
                                    console.error(err);
                                    this.alertService.alertError('Internal Server Error');
                                }
                            );
                    },
                    err => {
                        console.error(err);
                        this.alertService.alertError('Internal Server Error');
                    }
                );
        } else if (this.editModeexprience) {
            var newex = {
                company: this.exCompany,
                title: this.exTitle,
                country: this.exCountry,
                start: this.exStartyear,
                end: this.exEndyear
            };
            this.workexprience[this.workexprience.lastIndexOf(this.nowedittingexprience)] = newex;
            this.service
                .updateProfile({workexprience: this.workexprience})
                .subscribe(
                    res => {
                        this.alertService.alertSuccess('Work experience editted!');
                        this.service.getUserDetails()
                            .subscribe(
                                res => {
                                    if (res) {
                                        this.authService.setUser(res);
                                        this.nowedittingexprience = '';
                                        this.editModeexprience = false;
                                        this.addModeexprience = false;
                                        this.exCompany = '';
                                        this.exCountry = '';
                                        this.exStartyear = '';
                                        this.exTitle = '';
                                        this.exEndyear = '';
                                        this.excompanyFlag = false;
                                        this.excountryFlag = false;
                                        this.exstartFlag = false;
                                        this.exendFlag = false;
                                        this.extitleFlag = false;
                                    }
                                },
                                err => {
                                    console.error(err);
                                    this.alertService.alertError('Internal Server Error');
                                }
                            );
                    },
                    err => {
                        console.error(err);
                        this.alertService.alertError('Internal Server Error');
                    }
                );
        }
    }

    public changeEducation() {
        if (this.eduUniversity.length < 3 || this.eduTitle.length < 3 || this.eduCountry.length < 2 || this.eduStartyear.length < 4 || this.eduEndyear.length < 4 || this.eduEndyear < this.eduStartyear) {
            this.uniFlag = true;
            this.countryFlag = true;
            this.startFlag = true;
            this.endFlag = true;
            this.titleFlag = true;
            this.alertService.alertError('fix errors first.');
            return;
        }
        if (this.addMode) {
            if (this.education.length == 0) {
                this.education[0] = {
                    university: this.eduUniversity,
                    title: this.eduTitle,
                    country: this.eduCountry,
                    start: this.eduStartyear,
                    end: this.eduEndyear
                };
                this.completeProfile--;
                this.complete();
                this.changeComplete();
            } else {
                this.education.push({
                    university: this.eduUniversity,
                    title: this.eduTitle,
                    country: this.eduCountry,
                    start: this.eduStartyear,
                    end: this.eduEndyear
                });
            }
            this.service
                .updateProfile({education: this.education})
                .subscribe(
                    res => {
                        this.alertService.alertSuccess('education added!');
                        this.service.getUserDetails()
                            .subscribe(
                                res => {
                                    if (res) {
                                        this.authService.setUser(res);
                                        this.noweditting = '';
                                        this.editMode = false;
                                        this.addMode = false;
                                        this.eduUniversity = '';
                                        this.eduCountry = '';
                                        this.eduStartyear = '';
                                        this.eduTitle = '';
                                        this.eduEndyear = '';
                                        this.uniFlag = false;
                                        this.countryFlag = false;
                                        this.startFlag = false;
                                        this.endFlag = false;
                                        this.titleFlag = false;
                                    }
                                },
                                err => {
                                    console.error(err);
                                    this.alertService.alertError('Internal Server Error');
                                }
                            );
                    },
                    err => {
                        console.error(err);
                        this.alertService.alertError('Internal Server Error');
                    }
                );
        } else if (this.editMode) {
            var newedu = {
                university: this.eduUniversity,
                title: this.eduTitle,
                country: this.eduCountry,
                start: this.eduStartyear,
                end: this.eduEndyear
            };
            this.education[this.education.lastIndexOf(this.noweditting)] = newedu;
            this.service
                .updateProfile({education: this.education})
                .subscribe(
                    res => {
                        this.alertService.alertSuccess('education editted!');
                        this.service.getUserDetails()
                            .subscribe(
                                res => {
                                    if (res) {
                                        this.authService.setUser(res);
                                        this.noweditting = '';
                                        this.editMode = false;
                                        this.addMode = false;
                                        this.eduUniversity = '';
                                        this.eduCountry = '';
                                        this.eduStartyear = '';
                                        this.eduTitle = '';
                                        this.eduEndyear = '';
                                        this.uniFlag = false;
                                        this.countryFlag = false;
                                        this.startFlag = false;
                                        this.endFlag = false;
                                        this.titleFlag = false;
                                    }
                                },
                                err => {
                                    console.error(err);
                                    this.alertService.alertError('Internal Server Error');
                                }
                            );
                    },
                    err => {
                        console.error(err);
                        this.alertService.alertError('Internal Server Error');
                    }
                );
        }
    }

    public cancelEducationEdit() {
        this.noweditting = '';
        this.editMode = false;
        this.editEducation = false;
        this.addMode = false;
        this.eduUniversity = '';
        this.eduCountry = '';
        this.eduStartyear = '';
        this.eduTitle = '';
        this.eduEndyear = '';
        this.uniFlag = false;
        this.countryFlag = false;
        this.startFlag = false;
        this.endFlag = false;
        this.titleFlag = false;
    }

    public cancleExprienceEdit() {
        this.nowedittingexprience = '';
        this.addModeexprience = false;
        this.editModeexprience = false;
        this.editExprience = false;
        this.editModeexprience = false;
        this.addModeexprience = false;
        this.exCompany = '';
        this.exCountry = '';
        this.exStartyear = '';
        this.exTitle = '';
        this.exEndyear = '';
        this.excountryFlag = false;
        this.excompanyFlag = false;
        this.exstartFlag = false;
        this.exendFlag = false;
        this.extitleFlag = false;
    }

    public addEducationClick() {
        this.addEduBtn = 'Save education';
        this.noweditting = '';
        this.addMode = true;
        this.eduUniversity = '';
        this.eduCountry = '';
        this.eduStartyear = '';
        this.eduTitle = '';
        this.eduEndyear = '';
    }

    public addExprienceClick() {
        this.addExBtn = 'Save Exprience';
        this.nowedittingexprience = '';
        this.addModeexprience = true;
        this.exCompany = '';
        this.exCountry = '';
        this.exStartyear = '';
        this.exTitle = '';
        this.exEndyear = '';
    }

    public changeGeneralEdit() {
        this.generalEdit = !this.generalEdit;
    }

    public editEducations() {
        this.editEducation = !this.editEducation;
        this.noweditting = '';
        this.editMode = false;
        this.addMode = false;
        this.eduUniversity = '';
        this.eduCountry = '';
        this.eduStartyear = '';
        this.eduTitle = '';
        this.eduEndyear = '';
        this.uniFlag = false;
        this.countryFlag = false;
        this.startFlag = false;
        this.endFlag = false;
        this.titleFlag = false;
    }

    public editExpriences() {
        this.editExprience = !this.editExprience;
        this.nowedittingexprience = '';
        this.editModeexprience = false;
        this.addModeexprience = false;
        this.exCompany = '';
        this.exCountry = '';
        this.exStartyear = '';
        this.exTitle = '';
        this.exEndyear = '';
        this.excompanyFlag = false;
        this.excountryFlag = false;
        this.exstartFlag = false;
        this.exendFlag = false;
        this.extitleFlag = false;
    }

    public deleteEducationClick(education) {
        this.editMode = false;
        this.addMode = false;
        this.noweditting = '';
        this.education.splice(this.education.lastIndexOf(education), 1);
        this.service
            .updateProfile({education: this.education})
            .subscribe(
                res => {
                    this.alertService.alertSuccess('education deleted!');
                    this.service.getUserDetails()
                        .subscribe(
                            res => {
                                if (res) {
                                    this.authService.setUser(res);
                                    this.noweditting = '';
                                    this.editMode = false;
                                    this.addMode = false;
                                    this.eduUniversity = '';
                                    this.eduCountry = '';
                                    this.eduStartyear = '';
                                    this.eduTitle = '';
                                    this.eduEndyear = '';
                                    this.uniFlag = false;
                                    this.countryFlag = false;
                                    this.startFlag = false;
                                    this.endFlag = false;
                                    this.titleFlag = false;
                                    if (this.education.length == 0) {
                                        this.completeProfile++;
                                        this.changeComplete();
                                    }
                                }
                            },
                            err => {
                                console.error(err);
                                this.alertService.alertError('Internal Server Error');
                            }
                        );
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }

    public deleteExprienceClick(exprience) {
        this.editModeexprience = false;
        this.addModeexprience = false;
        this.nowedittingexprience = '';
        this.workexprience.splice(this.workexprience.lastIndexOf(exprience), 1);
        this.service
            .updateProfile({workexprience: this.workexprience})
            .subscribe(
                res => {
                    this.alertService.alertSuccess('Work experience deleted!');
                    this.service.getUserDetails()
                        .subscribe(
                            res => {
                                if (res) {
                                    this.authService.setUser(res);
                                    this.nowedittingexprience = '';
                                    this.editModeexprience = false;
                                    this.addModeexprience = false;
                                    this.exCompany = '';
                                    this.exCountry = '';
                                    this.exStartyear = '';
                                    this.exTitle = '';
                                    this.exEndyear = '';
                                    this.excountryFlag = false;
                                    this.excompanyFlag = false;
                                    this.exstartFlag = false;
                                    this.exendFlag = false;
                                    this.extitleFlag = false;
                                    if (this.workexprience.length == 0) {
                                        this.completeProfile++;
                                        this.changeComplete();
                                    }
                                }
                            },
                            err => {
                                console.error(err);
                                this.alertService.alertError('Internal Server Error');
                            }
                        );
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }

    public getSkills() {
        this.service
            .getUserSkills()
            .subscribe(
                res => {
                    if (res) {
                        this.alertService.alertSuccess('Work experience deleted!');
                        this.service.getUserDetails()
                            .subscribe(
                                res => {
                                    this.user_skills = res;
                                }
                            );
                    }
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }

    public goTo(id) {
        setTimeout(() => {
            document.getElementById(id).scrollIntoView({behavior: 'smooth', block: 'center'});
            document.getElementById(id).style.transition = '0.2s ease-out all';
            document.getElementById(id).style.border = '10px black solid';
            document.getElementById(id).style.borderRadius = '45px';
        }, 50);
        setTimeout(() => {
            document.getElementById(id).style.border = '0px black solid';
            document.getElementById(id).style.borderRadius = '0px';
        }, 550);
    }

    public getCompleteText() {
        if (this.user_description.length == 0) {
            return 'complete description';
        }else if(this.avatar.includes('assets/images/default-')){
            return 'update profile image';
        }else if (this.education.length == 0) {
            return 'complete education';
        } else if (this.workexprience.length == 0) {
            return 'complete work';
        }
    }

    public getCompletePic(text = null) {
        if(text){
            if (this.user_description.length == 0) {
                return 'description';
            }else if(this.avatar.includes('assets/images/default-')){
                return 'image';
            }else if (this.education.length == 0) {
                return 'education';
            } else if (this.workexprience.length == 0) {
                return 'work';
            }
        }else{
            if (this.user_description.length == 0) {
                return 'description';
            }else if(this.avatar.includes('assets/images/default-')){
                return '/images/default-' + this.user.user_id%12 ;
            }else if (this.education.length == 0) {
                return 'education';
            } else if (this.workexprience.length == 0) {
                return 'work';
            }
        }
    }

    public onUpdateProfileClick(e) {
        e.preventDefault();
        var user_skills = "";
        if (this.skills.length != 0 && this.user.role != 'employer') {
            this.skills.forEach(element => {
                if (user_skills == "") {
                    user_skills = element.value.replace(/[^a-zA-Z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
                } else {
                    user_skills = user_skills + ' , ' + element.value.replace(/[^a-zA-Z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
                }
            });
        }
        if (this.user.role == 'employer') {
            this.updateModel = {
                "skills": [{}],
                "user_skills": "",
                'first_name': this.firstname,
                'last_name': this.lastname,
                'phone': this.phonenumber,
                'country': this.country,
                'state': this.state,
                'description': this.description
            };
        } else {
            if (this.skills.length > 10) {
                this.alertService.alertError('You cant add more than 10 skills');
                return;
            }
            this.updateModel = {
                "skills": this.skills,
                "user_skills": user_skills,
                'first_name': this.firstname,
                'last_name': this.lastname,
                'phone': this.phonenumber,
                'country': this.country,
                'state': this.state,
                'description': this.description
            };
        }
        this.service
            .updateProfile(this.updateModel)
            .subscribe(
                res => {
                    // if (res) {
                    this.alertService.alertSuccess('update successfull');
                    this.service.getUserDetails()
                        .subscribe(
                            res => {
                                if (res) {
                                    // console.log(res);
                                    this.authService.setUser(res);
                                    this.first_name = this.updateModel.first_name;
                                    this.last_name = this.updateModel.last_name;
                                    this.phone_number = this.updateModel.phone;
                                    this.user_country = this.updateModel.country;
                                    this.user_skills = this.updateModel.skills;
                                    this.user_state = this.updateModel.state;
                                    if (this.user_description.length == 0 && this.updateModel.description.length != 0 && this.user.role != 'employer') {
                                        this.completeProfile--;
                                        this.complete();
                                        this.changeComplete();
                                    }
                                    this.user_description = this.updateModel.description;
                                    this.generalEdit = false;
                                    if (this.user.role == 'freelancer') {
                                        document.getElementById('user-name-fl').innerHTML = this.first_name + ' ' + this.last_name;
                                    } else {
                                        document.getElementById('user-name-emp').innerHTML = this.first_name + ' ' + this.last_name;
                                    }
                                    document.getElementById('header-name').innerHTML = this.first_name + ' ' + this.last_name;
                                    if (this.user_description.length == 0 && this.user.role == 'freelancer') {
                                        this.completeProfile++;
                                        this.changeComplete();
                                    }
                                }
                            },
                            err => {
                                console.error(err);
                                this.alertService.alertError('Internal Server Error');
                            }
                        );
                    // }
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }

    public editEmailClick() {
        this.editmail = !this.editmail;
        if (!this.editmail) {
            this.changeEmail = false;
            this.newemail = '';
        }
    }

    public addIdentifierProfileClick() {
        this.addIdentifierModel = {
            email: this.newemail
        };

        this.service
            .addIdentifierProfile(this.addIdentifierModel)
            .subscribe(
                res => {
                    if (res) {
                        this.alertService.alertSuccess('Verification email sent');
                        this.authService.setUser(res);
                    }
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }

    public removeIdentifierProfileClick() {

        this.service
            .removeIdentifierProfile(this.addIdentifierModel)
            .subscribe(
                res => {
                    if (res) {
                        this.alertService.alertSuccess('updated profile details successfull');
                        this.authService.setUser(res);
                    }
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }

    public endsWith$(control: FormControl) {
        if (control.value.length < 3) {
            return {
                'endsWith$': true
            };
        }
        return null;
    }

    public changePasswordProfileClick() {
        if (this.new_password != this.c_new_password) {
            this.alertService.alertError('new password and confirmation dont match!');
            return;
        }
        if (this.new_password.length < 6) {
            this.alertService.alertError('new password must be atleast 6 characters!');
            return;
        }
        if (!this.reset_password) {
            return;
        }
        this.changePasswordModel = {
            old_password: this.old_password,
            password: this.new_password
        }
        this.service
            .changePasswordProfile(this.changePasswordModel)
            .subscribe(
                res => {
                    if (res) {
                        this.alertService.alertSuccess('update successfull');
                        // this.authService.setUser(res);
                        this.reset_password = false;
                    }
                },
                err => {
                    console.error(JSON.stringify(err));
                    this.alertService.alertError(err.error.message ? err.error.message : 'Internal server error');
                }
            );
    }

    public onFileAdded(imageFile) {
        this.files.clear();
        this.files.add(imageFile);
        this.avatarProfileClick();
    }

    public addFile(e: Event) {
        e.stopPropagation()
        this.file.nativeElement.click();
    }

    public avatarProfileClick() {
        const formData: FormData = new FormData();
        this.files.forEach(file => {
            formData.append('avatar', file, file.name);
        });
        this.service
            .avatarProfile(formData)
            .subscribe(
                res => {
                    if (res) {
                        var tmp = false;
                        this.alertService.alertSuccess('update successfull');
                        this.authService.updateAvatar(res.result);
                        if(this.avatar.includes('assets/images/default-') || !this.avatar){
                            tmp = true;
                        }
                        this.avatar = res.result;
                        if(this.avatar && this.completeProfile != 0 && tmp){
                            this.completeProfile--;
                        }
                        //update header image
                        var img: any = document.getElementById('header-img');
                        img.src = res.result;
                    }
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }

    /**
     * just Token in header
     * @param e
     */
    public deleteAvatarProfileClick(e) {
        e.preventDefault();

        this.service
            .deleteAvatarProfile()
            .subscribe(
                res => {
                    if (res) {
                        this.alertService.alertSuccess('update successfull');
                        this.authService.setUser(res);
                    }
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }

    /**
     *
     * @param {string} value
     * @returns {string[]}
     * @private
     */
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }

    /**
     *
     */
    private checkBid() {
        if ( this.user && this.user.role == 'freelancer' ) {
            this.service.getMyBidCount()
                .subscribe(
                    res => {
                        if (res) {
                            let tmpTotalBid = 0
                            let tmpRemainBid = 0
                            let tmpTotalBidExtra = 0
                            let tmpRemainBidExtra = 0
                            res.bids.forEach(function (entry) {
                                if(entry.plan_id == 1){
                                    tmpTotalBid = tmpTotalBid + entry.total_bid;
                                }else if(entry.plan_id == 2){
                                    tmpTotalBidExtra = tmpTotalBidExtra + entry.total_bid;
                                }
                            });
                            res.bids.forEach(function (entry) {
                                if(entry.plan_id == 1){
                                    tmpRemainBid = tmpTotalBid - entry.used_bid;
                                }else if(entry.plan_id == 2){
                                    tmpRemainBidExtra = tmpTotalBidExtra - entry.used_bid;
                                }
                            });
                            this.total_bid = tmpTotalBid;
                            this.remain_bid = tmpRemainBid;
                            this.total_bid_extra = tmpTotalBidExtra;
                            this.remain_bid_extra = tmpRemainBidExtra;
                        }
                    },
                    err => {
                        this.alertService.alertError(err.body.error);
                    }
                );
        }
    }
}

@Component({
    selector: 'samplework',
    templateUrl: 'samplework.html',
})
export class DialogSampleWork {
    @ViewChild('file', {static: false}) file;
    public files: Set<File> = new Set();

    progress;
    progresses;
    count = 0;
    canBeClosed = true;
    primaryButtonText = 'Upload';
    uploadedFile = false;
    showCancelButton = true;
    uploading = false;
    uploadSuccessful = false;
    fileUrls: any = '';
    newsampledescription = '';
    newsampletitle = '';
    public updateModel = {
        worksample: [{
            'url': '',
            'title': '',
            'description': ''
        }]
    };
    oldsamples: any = [{}];

    uploadForm: FormGroup;
    public worksample: any;

    constructor(private router: Router,
                private authService: AuthService,
                private service: ApiService,
                private helper: HelperFunction,
                public formBuilder: FormBuilder,
                private alertService: AlertService,
                public uploadService: UploadService,
                @Inject(PLATFORM_ID) private platformId: Object,
                public dialogRef: MatDialogRef<DialogSampleWork>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData,
                private metaService: MetaService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.worksample = this.authService.getUser().worksample ? this.authService.getUser().worksample : '';
        }
    }

    onFilesAdded() {
        const files: { [key: string]: File } = this.file.nativeElement.files;
        const maxAllowedSize = 25 * 1024 * 1024;
        this.files.clear();
        this.files.add(files[0]);
        if (files[0].size > maxAllowedSize) {
            this.files.clear();
            this.alertService.alertError('Cant add more than 25Mb file');
        } else {
            this.uploadFiles();
        }
    }

    removeFile() {
        this.files.clear();
        this.uploadedFile = false;
    }

    addFiles() {
        this.file.nativeElement.click();
    }


    blurtitle = false;
    blurdesc = false;

    public uploadWorkSample(e) {
        e.preventDefault();
        if (this.files.size == 0) {
            this.alertService.alertError('Add a file first');
        } else if (!this.uploadedFile) {
            this.alertService.alertError('Still uploading your file');
            return;
        }
        this.oldsamples = this.authService.getUser().worksample ? this.authService.getUser().worksample : [];
        this.oldsamples.push({
            'url': this.fileUrls.urlPath,
            'title': this.newsampletitle,
            'description': this.newsampledescription
        });

        this.updateModel = {
            worksample: this.oldsamples
        };

        this.service
            .updateProfile(this.updateModel)
            .subscribe(
                res => {
                    this.alertService.alertSuccess('update successfull');
                    this.service.getUserDetails()
                        .subscribe(
                            res => {
                                if (res) {
                                    this.authService.setUser(res);
                                    this.worksample = this.updateModel;
                                    this.dialogRef.close(this.worksample);
                                }
                            },
                            err => {
                                console.error(err);
                                this.alertService.alertError('Internal Server Error');
                            }
                        );
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }


    closeDialog() {
        this.dialogRef.close();
    }

    uploadFiles() {
        if (this.uploadSuccessful) {
            //close
        }

        this.uploading = true;

        this.progress = this.uploadService.upload(this.files);

        for (const key in this.progress) {
            this.progress[key].progress.subscribe(val =>
                    //console.log(val)
                {
                }
            );
        }
        for (const key in this.progress) {
            this.progress[key].body.subscribe(val => {
                this.fileUrls = val;
                this.uploadedFile = true;
            });
        }

        let allProgressObservables = [];
        for (let key in this.progress) {
            allProgressObservables.push(this.progress[key].progress);
        }

        this.primaryButtonText = 'Finish';

        this.canBeClosed = false;

        this.showCancelButton = false;

        forkJoin(allProgressObservables).subscribe(end => {
            //console.log(this.fileUrls);
            this.canBeClosed = true;
            this.uploadSuccessful = true;
            this.uploading = false;
        });
    }


}

@Component({
    selector: 'sampleworkview',
    templateUrl: 'sampleworkview.html',
})
export class DialogSampleWorkView {
    constructor(public dialogRef: MatDialogRef<DialogSampleWorkView>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData,
                @Inject(PLATFORM_ID) private platformId: Object,
                private authService: AuthService) {
    }

    newWindowOpen(e) {
        window.open(e);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}


@Component({
    selector: 'buy-bid-profile-dialog',
    templateUrl: 'buy-bid-profile-dialog.html',
    styleUrls: ['buy-bid-profile-dialog.css']
})
export class BuyBidProfileDialog implements OnInit {
    constructor(private service: ApiService,
                private alertService: AlertService,
                private formBuilder: FormBuilder,
                private metaService: MetaService,
                public dialogRef: MatDialogRef<BuyBidProfileDialog>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }


    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


}