import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';

import {BlockUiService} from '../../tools/blockui-service';
import {ApiService} from '../../Services/Api.Service';
import {AuthService} from "../../tools/auth-service";
import {MetaService} from '../../tools/meta.service';
import {HelperFunction} from "../../tools/helper-function";

import {StaticData} from "../../Services/static-data";
import { AlertService } from '../../tools/alert.service';


@Component({
    selector: 'app-search-freelancer',
    styleUrls: ['./search-freelancer.component.scss'],
    templateUrl: './search-freelancer.component.html'
})

/**
 * This class present search freelancers in route `/freelancer/:action/:data`
 */
export class SearchFreelancerComponent {

    public length = 10;
    public myFlSlideOptions = {
        items: this.length,
        nav: true,
        navText: [
            '<svg class="first" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="62" height="62" viewBox="0 0 62 62"><defs><style>.a1{fill:#fff;stroke:#ec7f4a;stroke-width:4px;}.b1{stroke:#000;}.c1{stroke:none;}.d1{fill:none;}.e1{filter:url(#a1);}</style><filter id="a1" x="0" y="0" width="62" height="62" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur stdDeviation="3" result="b"/><feFlood flood-opacity="0.161"/><feComposite operator="in" in2="b"/><feComposite in="SourceGraphic"/></filter></defs><g transform="translate(-1527 -173)"><g class="e1" transform="matrix(1, 0, 0, 1, 1527, 173)"><g class="a1" transform="translate(9 6)"><circle class="c1" cx="22" cy="22" r="22"/><circle class="d1" cx="22" cy="22" r="20"/></g></g><path class="b1" d="M4,11H16.17L10.58,5.41,12,4l8,8-8,8-1.41-1.41L16.17,13H4Z" transform="translate(1570 213) rotate(180)"/></g></svg>',
            '<svg class="hide-show animate" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="62" height="62" viewBox="0 0 62 62"><defs><style>.a{fill:#fff;stroke:white;stroke-width:4px;}.b{stroke:#000;}.c{stroke:none;}.d{fill:none;}.e{filter:url(#a);}.animate .d,.a{animation: load-icon 1.5s linear .4s ;stroke-dasharray: 200;animation-direction: alternate-reverse;}@keyframes load-icon {to {stroke-dashoffset:200;stroke:#EC7F4A;}}</style><filter id="a" x="0" y="0" width="62" height="62" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur stdDeviation="3" result="b"/><feFlood flood-opacity="0.161"/><feComposite operator="in" in2="b"/><feComposite in="SourceGraphic"/></filter></defs><g transform="translate(-11 -173)"><g class="e" transform="matrix(1, 0, 0, 1, 11, 173)"><g class="a" transform="translate(9 6)"><circle class="c" cx="22" cy="22" r="22"/><circle class="d" cx="22" cy="22" r="20"/></g></g><path class="b" d="M20,11H7.83l5.59-5.59L12,4,4,12l8,8,1.41-1.41L7.83,13H20Z" transform="translate(54 213) rotate(-180)"/></g></svg>            '
        ],
        merge: true,
        lazyload: false,
        autoWidth: true,
        loop: false,
        center: false,
        dots: false,
        responsive: {0: {items: 1}, 650: {items: 2}, 850: {items: 3}, 1400: {items: 4}}
    };
    public projects: [{}];
    public collapsed: any = [{}];
    public firstTime = true;
    public skills = [
        {
            check: false,
            title: "Graphic Design"
        },
        {
            check: false,
            title: "Content Writing"
        },
        {
            check: false,
            title: "Virtual Assistance"
        },
        {
            check: false,
            title: "Marketing"
        },
        {
            check: false,
            title: "Accounting"
        },
        {
            check: false,
            title: "Web Development"
        },
        {
            check: false,
            title: "Video editing"
        },
        {
            check: false,
            title: "Data Entry"
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
    public limit = 10;
    public offset: any = 0;
    public first = false;
    public onlyCountry = '';
    public countries = StaticData.COUNTRIES;
    public action = null;
    public data = null;
    public titleParam = '';
    public showBanner = false;
    public countryName = '';

    constructor(private service: ApiService,
                private route: ActivatedRoute,
                private router: Router,
                private helper: HelperFunction,
                private metaService: MetaService,
                private alertService: AlertService,
                private authService: AuthService,
                private blockui: BlockUiService,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
     * ngOnInit()
     */
    public ngOnInit() {
        this.onlyCountry = null;
        this.blockui.unBlockPage();
        this.metaService.setTitle('Search for Freelancers | Perfectlancer');
        this.metaService.setDescription('Search for skilled freelancers and find the top rated ones to work with in many fields of accounting, development, design, writing and much more.');
        this.user = this.authService.getUser();
        if (this.user && this.user.role == 'freelancer' && this.user.skills && (this.user.skills[0].length != undefined ) && this.user.skills.lenght != 0) {
            this.skills = [];
            this.user.skills.forEach(element => {
                this.skills.push({
                    title: element.value,
                    check: false,
                });
            });
        }
        this.route.paramMap.subscribe(param => {
            let queryParam = this.route.snapshot.queryParamMap;
            this.titlesearch = queryParam.get('title') ? queryParam.get('title') : '';
            this.orders = queryParam.get('order') ? queryParam.get('order') : 'default';
            this.urlFilter = queryParam.get('filter') ? queryParam.get('filter') : '';
            this.urlFilter.split(',').forEach(element => {
                let i = 1;
                for ( let item of this.skills ) {
                    if ( element == item.title ) {
                        i--;
                        item.check = true;
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
            this.offset = queryParam.get('offset') ? queryParam.get('offset') : 0;
            if (isPlatformBrowser(this.platformId)) {
                if(this.offset > 0 && !this.user){
                    this.alertService.alertWarn("You need to Register/Login to see other freelancers");
                    this.router.navigateByUrl('/register');
                    return;
                }
            }
            this.action = param.get('action');
            this.data = param.get('data');
            if ( this.action && this.data ) {
                if ( this.action == 'country' ) {
                    let search = this.countries.filter(e => {
                        return e.code.toLowerCase() == this.data.replace(/-/g, ' ').toLowerCase() ||
                            e.name.toLowerCase() == this.data.replace(/-/g, ' ').toLowerCase();
                    });
                    if ( search && search.length > 0 ) {
                        this.showBanner = true;
                        this.onlyCountry = search[0].code.toUpperCase();
                        this.countryName = search[0].name;
                        this.metaService.setTitle('Hire professional Freelancers in ' + search[0].name + ' | Perfectlancer');
                        this.metaService.setDescription('You can find many top freelancers in different fields from ' + search[0].name + ' in Perfectlancer. Start by searching on Perfectlancer and Hire Professional Freelancers.');
                    }
                }
                if ( this.action == 'skill' ) {
                    this.metaService.setTitle('Hire professional Freelancers in ' + this.data + ' | Perfectlancer');
                    this.metaService.setDescription('You can find many top freelancers in ' + this.data + ' from around the world in Perfectlancer. Start by searching on Perfectlancer and Hire Professional Freelancers.');
                    this.urlFilter = this.data;
                    let searchSkills = this.skills.filter(e => {return e.title == this.data;});
                    if ( searchSkills && searchSkills.length == 0 ) {
                        this.skills.push({
                            title: this.data,
                            check: true,
                        });
                    } else {
                        for ( let item of this.skills ) {
                            if ( item.title === this.data ) {
                                item.check = true;
                                break;
                            }
                        }
                    }
                    this.getSeoContent(this.data);
                }
            }
            this.getProjects();
        });
    }


    public getSeoContent(title){
        this.service
            .getSeoContent(title,this.router.url.split('/')[1].split('/')[0])
            .subscribe(
                res => {
                    if ( res.data ) {
                        this.parser(res.data.content);
                    }
                },
                error => {
                    console.error(error);
                    this.blockui.unBlockPage();
                }
            );
    }

    /**
     * Search
     */
    public getProjects(state = null) {
        if (isPlatformBrowser(this.platformId)) {
            if(this.offset > 0 && !this.user){
                return;
            }
        }
        this.titleParam = this.titlesearch;
        this.blockui.blockPage();
        let skillfilter = [];
        this.skills.forEach(function (element) {
            if ( element.check ) {
                skillfilter.push(element.title);
            }
        });
        let filter = "";
        skillfilter.forEach(element => {
            let str = element.replace(/[^a-zA-Z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
            filter += "&user_skills=like.*" + str + "*";
        });
        this.service
            .getFreelancersByTitle(
                this.titlesearch,
                this.minbudget == '' ? 0 : this.minbudget,
                this.maxbudget == '' ? 1000000 : this.maxbudget,
                this.limit,
                state == 'unshift' ? this.before : this.offset,
                filter,
                this.orders,
                this.onlyCountry ? this.onlyCountry : (this.usonly ? 'US' : null)
            )
            .subscribe(
                res => {
                    if ( res ) {
                        if ( state == 'unshift' ) {
                            res[0].forEach(element => {
                                this.projects.unshift(element);
                            });
                        } else if ( state == 'push' ) {
                            res[0].forEach(element => {
                                this.projects.push(element);
                            });
                        } else {
                            this.projects = res[0];
                        }
                        this.projectsLenght = res[1] ? res[1].split('/')[1] : 300;
                        if ( this.first ) {
                            this.action ? this.apply('/freelancer/' + this.action + '/' + this.data) : this.apply();
                        }
                        this.first = true;
                        this.blockui.unBlockPage();
                        if ( isPlatformBrowser(this.platformId) ) {
                            let element = document.getElementById('top');
                            element.scrollIntoView({block: 'end'});
                        }
                    }
                },
                error => {
                    console.error(error);
                    this.blockui.unBlockPage();
                }
            );
    }

    public html = '';
    public hasSeoText = false;

    public parser(text){
        this.hasSeoText = true;
        text = text.replace(/\$\/t/g,`</h1>`);
        text = text.replace(/\$t/g,`<h1 class="title my-3 w-100 b-700 fs-35 text-center">`);
        text = text.replace(/\$\/d/g,`</div>`);
        text = text.replace(/\$d/g,`<div class="decsription fs-15">`);
        text = text.replace(/\$\/p/g,`</div>`);
        text = text.replace(/\$p/g,`<div>`);
        text = text.replace(/\$\/c/g,`</div>`);
        text = text.replace(/\$c/g,`<div class="category fs-17 b-500 my-3">`);
        text = text.replace(/\$\/s/g,`<div class="subcategory my-4 fs-15">`);
        text = text.replace(/\$s/g,`</div>`);
        text = text.replace(/\$\/u/g,`</ul>`);
        text = text.replace(/\$u/g,`<ul class="ulist">`);
        text = text.replace(/\$\/l/g,`</li>`);
        text = text.replace(/\$l/g,`<li class="list">`);
        text = text.replace(/\$\/a/g,`</a>`);
        text = text.replace(/\$e/g,`">`);
        text = text.replace(/\$a/g,`<a class="link b-600" href=">`);

        this.html = text;

    }


    // public getProjectCountry() {
    //     this.blockui.blockPage();
    //     let skillfilter = [];
    //     let skills = this.skillFilters;
    //     this.skills.forEach(function (element) {
    //         if (skills && skills[element] == true) {
    //             skillfilter.push(element);
    //         }
    //     });
    //     let filter = "";
    //     skillfilter.forEach(element => {
    //         filter += "&user_skills=like.*" + element + "*";
    //     });
    //     this.service
    //         .getFreelancersByCountry(this.titlesearch, this.minbudget == '' ? 0 : this.minbudget, this.maxbudget == '' ? 1000000 : this.maxbudget, this.limit, this.pageEvent == null ? this.offset : this.pageEvent.pageIndex, filter, this.orders, this.onlyCountry)
    //         .subscribe(
    //             res => {
    //                 if (res) {
    //                     this.projects = res[0];
    //                     this.projectsLenght = res[1] ? res[1].split('/')[1] : 300;
    //                     if (this.first) {
    //                         this.apply('/freelancer/' + this.onlyCountry);
    //                     }
    //                     this.first = true;
    //                     if (isPlatformBrowser(this.platformId)) {
    //                         let element = document.getElementById('top');
    //                         element.scrollIntoView({block: 'end'});
    //                     }
    //                 }
    //                 this.blockui.unBlockPage();
    //             },
    //             error => {
    //                 console.error(error);
    //                 this.blockui.unBlockPage();
    //             }
    //         );
    // }


    /**
     *
     */
    public skillSearch() {
        this.offset = 0;
        this.getProjects();
    }

    public isEmpty(e){
        this.titlesearch = e;
        if(this.titleParam.length > 0 && e.length == 0){
            this.offset = 0;
            this.getProjects();
        }
    }

    public cards = false;
    public toggleFilters() {
        if(this.cardview){
            this.cardview = false;
            document.getElementById('fullcard').className = "col-md-8";
        }else{
            this.cardview = true;
            document.getElementById('fullcard').className = "col-md-10";
        }
    }

    public cardview = false;
    public before = 0;

    public beforeCheck(i) {
        return ((i == 0) && (this.projects.length < ((parseInt(this.offset) + 1) * 10)));
    }

    public resetFilters() {
        this.usonly = false;
        this.orders = "default";
        this.urlFilter = '';
        this.titlesearch = '';
        // this.skillFilters = [];
        this.offset = 0;
        for ( let item of this.skills ) {
            item.check = false;
        }
        this.getProjects();
    }

    public afterCheck(i) {
        return (i == (this.projects.length - 1) ) && (this.projectsLenght > this.offset * 10);
    }

    /**
     *
     */
    public pushProjectsBefore() {
        this.before = this.before - 1;
        this.getProjects('unshift');
    }

    /**
     *
     */
    public pushProjects() {
        this.length += 10;
        this.offset = parseInt(this.offset) + 1;
        this.getProjects('push');
    }


    /**
     *
     * @param id
     */
    public closeDropDown(id) {
        document.getElementById('dropdown-content' + id).style.display = 'none';
    }

    /**
     *
     * @param id
     */
    public openDropDown(id) {
        if (document.getElementById('dropdown-content' + id).style.display != 'block') {
            document.getElementById('dropdown-content' + id).style.display = 'block';
        } else {
            document.getElementById('dropdown-content' + id).style.display = 'none';
        }
    }


    /**
     *
     * @param order
     */
    public changeOrder(order) {
        this.orders = order;
        this.getProjects();
    }

    /**
     *
     * @param skill
     */
    public checkboxClick(skill) {
        skill.check = !skill.check;
        this.offset = 0;
        this.getProjects();
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
                check: true,
            });
            this.newSkill = '';
        }
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

    public collapse(id) {
        // var tmp : any = document.getElementById(id);
        this.firstTime = false;
        if (this.collapsed[id] == true) {
        } else {
            var divHeight;
            var obj = document.getElementById('flcard'+id);
            var tmp = '';
            if(!(document.getElementById('avatar'+id) as HTMLImageElement).src.includes('incomplete.png')){
                tmp = (document.getElementById('avatar'+id) as HTMLImageElement).src;
            }
            divHeight=obj.offsetHeight;
            this.collapsed = [{}];
            this.collapsed[id] = true;
            setTimeout(() => {
                var elmnt = document.getElementById(id);
                elmnt.scrollIntoView({behavior: 'smooth', block: 'center'});
                if(divHeight == obj.offsetHeight){
                    (document.getElementById('avatar'+id) as HTMLImageElement).src = "../../../assets/images/incomplete.png";
                    setTimeout(() => {
                        if(tmp !== ''){
                            (document.getElementById('avatar'+id) as HTMLImageElement).src = tmp;
                        }
                    }, 2000);
                }
            }, 50);
        }
    }

    private apply(url = '/freelancer') {
        let temp = this.skills.filter(e => {return e.check}).map(e => e.title);
        let filter = temp.join(',');
        let queryParams: Params = {
            title: [this.titlesearch],
            // min_budget: this.minbudget,
            order: [this.orders],
            filter: [filter],
            // max_budget: this.maxbudget,
            offset: [this.offset]
        };
        if (filter == "") {
            queryParams = {
                title: [this.titlesearch],
                // min_budget: this.minbudget,
                order: [this.orders],
                // max_budget: this.maxbudget,
                offset: [this.offset]
            };
        }
        this.helper.changeRouteParams(url, queryParams);
    }

}

interface filter {
    id: string;
    name: string;
    items: any[];
}
