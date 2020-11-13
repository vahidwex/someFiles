import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {BlockUiService} from '../../tools/blockui-service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

import {BidDialog} from "../../public-directives/bid-dialog/bid-dialog";
import {BuyBidDialog} from "../../public-directives/buy-bid-dialog/buy-bid-dialog";

import {ApiService} from '../../Services/Api.Service';
import {AlertService} from '../../tools/alert.service';
import {MetaService} from '../../tools/meta.service';
import {AuthService} from "../../tools/auth-service";
import {MatDialog} from '@angular/material/dialog';

import {Api} from "../../Services/Api";

import {StaticData} from "../../Services/static-data";

import {HelperFunction} from "../../tools/helper-function";

interface filter {
    id: string;
    name: string;
    items: any[];
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

@Component({
    selector: 'app-search-page',
    styleUrls: ['./search-page.component.css'],
    templateUrl: './search-page.component.html'
})

export class SearchPageComponent {

    public uploadUrl = Api.FILE_ADDRESS;
    public site_url = Api.WEBSITE_URL;
    public projects: [{}];
    public collapsed: any = [{}];
    public skillcollapsed: any = [{}];
    public firstTime = true;
    public types = ['Local Jobs', 'Featured Jobs', 'Recruiter Jobs', 'Full Time Jobs'];
    public skills = [
        {
            title: "app development",
            check: false,
        },
        {
            title: "indesign",
            check: false,
        },
        {
            title: "illustrator",
            check: false,
        },
        {
            title: "customer service",
            check: false,
        },
        {
            title: "translation",
            check: false,
        },
        {
            title: "shopify",
            check: false,
        },
        {
            title: "graphic design",
            check: false,
        },
        {
            title: "SEO",
            check: false,
        },
        {
            title: "content writer",
            check: false,
        },
    ];
    public newSkill = '';
    public titlesearch = '';
    public projectsLenght = 0;
    public usonly = false;
    public user: any;
    public orders = "default";
    public urlFilter = '';
    public skillFilters: any = [];
    public minbudget = '';
    public maxbudget = '';
    public jobskills = ['Graphic Design', 'Photography', 'Photoshop', 'Website', 'Design'];
    public limit = 10;
    public offset: number = 0;
    public first = false;
    public bookmarkMode = false;
    public bookmarks = [];
    public bookmarkedProjects: any = null;
    public total_bid = 0;
    public total_bid_extra = 0;
    public remain_bid_extra = 0;
    public remain_bid = NaN;
    public onlyCountry = '';
    public countries = StaticData.COUNTRIES;
    public titleParam = '';

    constructor(private service: ApiService,
                private route: ActivatedRoute,
                private router: Router,
                private authService: AuthService,
                private helper: HelperFunction,
                private blockui: BlockUiService,
                private metaService: MetaService,
                public dialog: MatDialog,
                private alertService: AlertService,
                @Inject(PLATFORM_ID) private platformId: Object) {
    }

    public action = '';
    public data = '';
    public showBanner = false;
    public countryName = '';


    /**
     * ngOnInit()
     */
    public ngOnInit() {
        this.onlyCountry = null;
        this.metaService.setTitle('Search for Jobs | Perfectlancer');
        this.metaService.setDescription('Search for high paying freelance jobs and get hired - With Perfectlancer, you can find a wide range of jobs to work in like Translation, Sales and Marketing, Technical Writing and Proof Reading, UI/UX and many more...');
        this.blockui.blockPage();
        this.user = this.authService.getUser();
        if (this.user && this.user.role == 'freelancer' &&
            this.user.skills && (this.user.skills[0].length != 0 ) && this.user.skills.lenght != 0) {
            this.skills = [];
            for (let item of this.user.skills) {
                this.skills.push({
                    title: item.value,
                    check: false,
                });
            }
        }
        this.route.paramMap.subscribe(param => {
            let queryParam = this.route.snapshot.queryParamMap;
            this.titlesearch = queryParam.get('title') ? queryParam.get('title') : '';
            this.orders = queryParam.get('order') ? queryParam.get('order') : 'default';
            this.urlFilter = queryParam.get('filter') ? queryParam.get('filter') : '';
            this.urlFilter.split(',').forEach(element => {
                let i = 1;
                for (let item of this.skills) {
                    if (item.title == element) {
                        i--;
                        item.check = true;
                        break;
                    }
                }
                if(i == 1 && element.length > 0){
                    this.skills.push({
                        title: element,
                        check: true,
                    });
                }
            });
            this.minbudget = queryParam.get('min_budget') ? queryParam.get('min_budget') : '';
            this.maxbudget = queryParam.get('max_budget') ? queryParam.get('max_budget') : '';
            this.offset = queryParam.get('offset') ? parseInt(queryParam.get('offset')) : 0;
            if (isPlatformBrowser(this.platformId)) {
                if(this.offset > 0 && !this.user){
                    this.alertService.alertWarn("You need to Register/Login to see other projects");
                    this.router.navigateByUrl('/register');
                }
            }
            this.action = param.get('action');
            this.data = param.get('data');
            if (this.action && this.data) {
                if (this.action == 'country') {
                    let search = this.countries.filter(e => {
                        return e.code.toLowerCase() == this.data.toLowerCase().replace(/-/g, ' ')
                            || e.name.toLowerCase() == this.data.replace(/-/g, ' ').toLowerCase();
                    });
                    if ( search && search.length > 0 ) {
                        this.onlyCountry = search[0].code.toUpperCase();
                        this.countryName = search[0].name;
                        this.showBanner = true;
                        this.metaService.setTitle('Find Freelance Jobs in ' + search[0].name + ' | Perfectlancer');
                        this.metaService.setDescription('Start by searching for top freelance jobs in ' + search[0].name + ' in Perfectlancer. Find top paying freelance jobs today in Perfectlancer and Get Hired Now.');
                    }
                }
                if (this.action == 'skill') {
                    this.metaService.setTitle('Find Freelance Jobs in ' + this.data + ' | Perfectlancer');
                    this.metaService.setDescription('Start by searching for top freelance jobs in ' + this.data + ' in Perfectlancer. Find top paying freelance jobs today in Perfectlancer and Get Hired Now.');
                    this.urlFilter = this.data;
                    let searchSkills = this.skills.filter(e => {
                        return e.title == this.data;
                    });
                    if (searchSkills && searchSkills.length == 0) {
                        this.skills.push({
                            title: this.data,
                            check: true,
                        });
                    } else {
                        for (let item of this.skills) {
                            if (item.title === this.data) {
                                item.check = true;
                                break;
                            }
                        }
                    }
                }
            }
            this.getProjects('nginit');
        });

        this.getBookmarkProjects();
        this.checkBid();
    }

    public filtersVisiblity = true;

    public isEmpty(e){
        this.titlesearch = e;
        if(this.titleParam.length > 0 && e.length == 0){
            this.offset = 0;
            this.getProjects('isempty');
        }
    }

    public toggleFilters() {
        if(this.filtersVisiblity){
            document.getElementById('filters').style.display = 'none';
            document.getElementById('jobs').className = 'col-md-10';
            this.filtersVisiblity = false;
        }else{
            document.getElementById('filters').style.display = 'flex';
            document.getElementById('jobs').className = 'col-md-8';
            this.filtersVisiblity = true;
        }
    }

    public resetFilters() {
        this.usonly = false;
        this.orders = "default";
        this.urlFilter = '';
        this.titlesearch = '';
        // this.skillFilters = [];
        this.minbudget = '';
        this.maxbudget = '';
        this.offset = 0;
        for (let item of this.skills) {
            item.check = false;
        }
        this.getProjects('resetfilters');
    }

    /**
     *
     * @param id
     */
    public bookmarkProject(id) {
        if (this.user && this.user.role) {
            const requestModel = {
                "bookmark_project_id": id
            };
            this.service
                .bookmark(requestModel)
                .subscribe(
                    res => {
                        if (!this.bookmarks.includes(id)) {
                            if (this.bookmarks && this.bookmarks.length == 0) {
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

    /**
     *
     * @param id
     */
    public collapse(id) {
        // var tmp : any = document.getElementById(id);
        this.firstTime = false;
        if (this.collapsed[id] == true) {
        } else {
            this.collapsed = [{}];
            this.collapsed[id] = true;
            // if(document.getElementById('jobcard'+id).style.height)
            setTimeout(() => {
                var elmnt = document.getElementById(id);
                elmnt.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 50);
        }
    }

    //////////////////////// Html Events
    /**
     *
     */
    public changeBookmarkMode() {
        this.bookmarkMode = !this.bookmarkMode;
    }

    /**
     *
     * @param id
     */
    public unbookmarkProject(id) {
        if (this.user && this.user.role) {
            this.service.unbookmark(id)
                .subscribe(
                    res => {
                        if (this.bookmarks.includes(id)) {
                            this.bookmarks.splice(this.bookmarks.lastIndexOf(id), 1);
                        }
                    },
                    err => {
                        this.alertService.alertError(err.body.error);
                    }
                );
        }
    }

    /**
     *
     * @param project
     */
    public bidOnProject(project) {
        this.service.getMyBidCount()
            .subscribe(
                res => {
                    if (res) {
                        if (this.remain_bid > 2) {
                            this.openDialog(project);
                        } else {
                            this.alertService.alert('Insufficient bid count please charge your account.');
                        }
                    }
                },
                err => {
                    this.alertService.alertError(err.body.error);
                }
            );
    }

    /**
     *
     * @param order
     */
    public changeOrder(order) {
        this.orders = order;
        this.getProjects('changeoder');
    }

    /**
     *
     * @param skill
     */
    public checkboxClick(skill) {
        skill.check = !skill.check;
        this.offset = 0;
        this.getProjects('checkboxclick');
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
     */
    public addSkill() {
        if (this.newSkill != '') {
            this.skills.push({
                title: this.newSkill,
                check: true
            });
            this.newSkill = '';
        }
    }

    /**
     *
     * @param project
     */
    public postProjectLikeThis(project) {
        this.authService.setProjectLikeThis(project);
        this.router.navigateByUrl('/post-job');
    }

    /**
     *
     * @param id
     * @returns {any}
     */
    public isCollapsed(id) {
        return this.collapsed[id];
    }

    /**
     *
     * @param id
     */
    public closeAll(id) {
        if (this.collapsed[id]) {
            this.collapsed[id] = false;
            setTimeout(() => {
                var elmnt = document.getElementById(id);
                elmnt.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 50);
        }
    }

    /**
     *
     * @param e
     */
    public filterMin(e) {
        this.minbudget = this.minbudget.replace(/[^0-9]/g, '');
        e.target.value = this.minbudget;
    }

    /**
     *
     * @param e
     */
    public filterMax(e) {
        this.maxbudget = this.maxbudget.replace(/[^0-9]/g, '');
        e.target.value = this.maxbudget;
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
            this.checkBid();
        });
    }

    /**
     *
     * @param {Event} event
     */
    public openBuyBidDialog(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        const dialogRef = this.dialog.open(BuyBidDialog, {
            width: '728px',
            height: 'auto',
            data: this.user.first_name
        });

        dialogRef.afterClosed().subscribe(result => {
            this.checkBid();
            // //console.log('The dialog was closed');
        });
    }

    /**
     *
     */
    public getProjects(who) {
        if (isPlatformBrowser(this.platformId)) {
            if(this.offset > 0 && !this.user){
                return;
            }
        }
        this.titleParam = this.titlesearch;
        this.blockui.blockPage();
        let skillfilter = [];
        this.skills.forEach(function (element) {
            if (element.check) {
                skillfilter.push(element.title);
            }
        });
        let filter = "";
        skillfilter.forEach(element => {
            let str = element.replace(/[^a-zA-Z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
            filter += "&project_all_skills=like.*" + str + "*";
        });
        this.service
            .getProjectsByTitle(
                this.titlesearch,
                this.minbudget == '' ? 0 : this.minbudget,
                this.maxbudget == '' ? 1000000 : this.maxbudget,
                this.limit,
                this.offset,
                filter,
                this.orders,
                this.onlyCountry ? this.onlyCountry : (this.usonly ? 'US' : null)
            )
            .subscribe(
                res => {
                    if (res) {
                        this.projects = res[0];
                        this.projectsLenght = res[1] ? res[1].split('/')[1] : 300;
                        if (this.first) {
                            this.action ? this.apply('/search/' + this.action + '/' + this.data) : this.apply();
                        }
                        this.first = true;
                        this.blockui.unBlockPage();
                        if (isPlatformBrowser(this.platformId)) {
                            let elmnt = document.getElementById('top');
                            elmnt.scrollIntoView({block: 'end'});
                        }
                    }
                },
                err => {
                    this.alertService.alertError('Somethings went wrong.');
                    this.blockui.unBlockPage();
                }
            );
    }

    //////////////////////// Logic
    /**
     *
     */
    private getBookmarkProjects() {
        if (this.user && this.user.role) {
            this.service
                .getBookmarks()
                .subscribe(
                    response => {
                        if (response) {
                            response.forEach(element => {
                                if (this.bookmarks && this.bookmarks.length == 0) {
                                    this.bookmarks[0] = element.project_id;
                                } else {
                                    this.bookmarks.push(element.project_id);
                                }
                            });
                        }
                    },
                    err => {
                        this.alertService.alertError(err.body.error);
                    }
                );
        }
    }

    /**
     *
     * @param {string} url
     */
    private apply(url = '/search') {
        let skillfilter = [];
        this.skills.forEach(function (element) {
            if (element.check) {
                skillfilter.push(element.title);
            }
        });
        let filter = skillfilter.join(',');
        let queryParams: Params = {
            title: [this.titlesearch],
            min_budget: [this.minbudget],
            order: [this.orders],
            filter: [filter],
            max_budget: [this.maxbudget],
            offset: this.offset
        };
        if (filter == "") {
            queryParams = {
                title: [this.titlesearch],
                min_budget: [this.minbudget],
                order: [this.orders],
                max_budget: [this.maxbudget],
                offset: this.offset
            };
        }
        this.helper.changeRouteParams(url, queryParams);
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