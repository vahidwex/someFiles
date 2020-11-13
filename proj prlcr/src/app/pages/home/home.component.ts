import { Component,PLATFORM_ID,Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { AuthService } from "../../tools/auth-service";
import { MetaService } from '../../tools/meta.service';
import { ApiService } from "../../Services/Api.Service";

import { StaticData } from "../../Services/static-data";

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})

/**
 * This class present main website homepage.
 */
export class HomeComponent implements OnInit {

    public searchTabs = 'freelancers';
    public searchText = '';
    public skills = StaticData.HOMEPAGE_SKILLS;
    public allSkills = StaticData.ALL_SKILLS;
    public jobs :[{}];
    public posts: any = '';
    public title = 'owl-carousel';
    public freelancers = StaticData.HOMEPAGE_FREELANCERS;
    public projects = StaticData.HOMEPAGE_PROJECTS;
    public mySlideImages = ['../../../assets/avatar.png','../../../assets/avatar.png','../../../assets/avatar.png','../../../assets/avatar.png','../../../assets/avatar.png','../../../assets/avatar.png'];
    public myCarouselImages = ['../../../assets/avatar.png','../../../assets/avatar.png','../../../assets/avatar.png'];
    public mySlideOptions = {items: 6,autoWidth : true,center: true,
        nav: true,
        navText: [
            '<svg class="first" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" viewBox="0 0 62 62"><defs><style>.a1{fill:#fff;stroke:#ec7f4a;stroke-width:4px;}.b1{stroke:#000;}.c1{stroke:none;}.d1{fill:none;}.e1{filter:url(#a1);}</style><filter id="a1" x="0" y="0" width="62" height="62" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur stdDeviation="3" result="b"/><feFlood flood-opacity="0.161"/><feComposite operator="in" in2="b"/><feComposite in="SourceGraphic"/></filter></defs><g transform="translate(-1527 -173)"><g class="e1" transform="matrix(1, 0, 0, 1, 1527, 173)"><g class="a1" transform="translate(9 6)"><circle class="c1" cx="22" cy="22" r="22"/><circle class="d1" cx="22" cy="22" r="20"/></g></g><path class="b1" d="M4,11H16.17L10.58,5.41,12,4l8,8-8,8-1.41-1.41L16.17,13H4Z" transform="translate(1570 213) rotate(180)"/></g></svg>',
            '<svg class="hide-show animate" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" viewBox="0 0 62 62"><defs><style>.a{fill:#fff;stroke:white;stroke-width:4px;}.b{stroke:#000;}.c{stroke:none;}.d{fill:none;}.e{filter:url(#a);}.animate .d,.a{animation: load-icon 1.5s linear .4s ;stroke-dasharray: 200;animation-direction: alternate-reverse;}@keyframes load-icon {to {stroke-dashoffset:200;stroke:#EC7F4A;}}</style><filter id="a" x="0" y="0" width="62" height="62" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur stdDeviation="3" result="b"/><feFlood flood-opacity="0.161"/><feComposite operator="in" in2="b"/><feComposite in="SourceGraphic"/></filter></defs><g transform="translate(-11 -173)"><g class="e" transform="matrix(1, 0, 0, 1, 11, 173)"><g class="a" transform="translate(9 6)"><circle class="c" cx="22" cy="22" r="22"/><circle class="d" cx="22" cy="22" r="20"/></g></g><path class="b" d="M20,11H7.83l5.59-5.59L12,4,4,12l8,8,1.41-1.41L7.83,13H20Z" transform="translate(54 213) rotate(-180)"/></g></svg>            '
        ],loop:true, dots: false,responsive:{ 0:{ items: 1 }, 650:{ items: 2 }, 850:{ items: 3 },1400:{ items: 4 }}};
    public myFlSlideOptions = {items: 6,autoWidth : true,
        navText: [
            '<svg class="first" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" viewBox="0 0 62 62"><defs><style>.a1{fill:#fff;stroke:#ec7f4a;stroke-width:4px;}.b1{stroke:#000;}.c1{stroke:none;}.d1{fill:none;}.e1{filter:url(#a1);}</style><filter id="a1" x="0" y="0" width="62" height="62" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur stdDeviation="3" result="b"/><feFlood flood-opacity="0.161"/><feComposite operator="in" in2="b"/><feComposite in="SourceGraphic"/></filter></defs><g transform="translate(-1527 -173)"><g class="e1" transform="matrix(1, 0, 0, 1, 1527, 173)"><g class="a1" transform="translate(9 6)"><circle class="c1" cx="22" cy="22" r="22"/><circle class="d1" cx="22" cy="22" r="20"/></g></g><path class="b1" d="M4,11H16.17L10.58,5.41,12,4l8,8-8,8-1.41-1.41L16.17,13H4Z" transform="translate(1570 213) rotate(180)"/></g></svg>',
            '<svg class="hide-show animate" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" viewBox="0 0 62 62"><defs><style>.a{fill:#fff;stroke:white;stroke-width:4px;}.b{stroke:#000;}.c{stroke:none;}.d{fill:none;}.e{filter:url(#a);}.animate .d,.a{animation: load-icon 1.5s linear .4s ;stroke-dasharray: 200;animation-direction: alternate-reverse;}@keyframes load-icon {to {stroke-dashoffset:200;stroke:#EC7F4A;}}</style><filter id="a" x="0" y="0" width="62" height="62" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur stdDeviation="3" result="b"/><feFlood flood-opacity="0.161"/><feComposite operator="in" in2="b"/><feComposite in="SourceGraphic"/></filter></defs><g transform="translate(-11 -173)"><g class="e" transform="matrix(1, 0, 0, 1, 11, 173)"><g class="a" transform="translate(9 6)"><circle class="c" cx="22" cy="22" r="22"/><circle class="d" cx="22" cy="22" r="20"/></g></g><path class="b" d="M20,11H7.83l5.59-5.59L12,4,4,12l8,8,1.41-1.41L7.83,13H20Z" transform="translate(54 213) rotate(-180)"/></g></svg>            '
        ],loop:true,center: true, dots: false, nav: true,responsive:{ 0:{ items: 1 }, 650:{ items: 2 }, 850:{ items: 3 },1400:{ items: 4 }}};
    public myCarouselOptions = {items: 6,
        navText: [
            '<svg class="first" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" viewBox="0 0 62 62"><defs><style>.a1{fill:#fff;stroke:#ec7f4a;stroke-width:4px;}.b1{stroke:#000;}.c1{stroke:none;}.d1{fill:none;}.e1{filter:url(#a1);}</style><filter id="a1" x="0" y="0" width="62" height="62" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur stdDeviation="3" result="b"/><feFlood flood-opacity="0.161"/><feComposite operator="in" in2="b"/><feComposite in="SourceGraphic"/></filter></defs><g transform="translate(-1527 -173)"><g class="e1" transform="matrix(1, 0, 0, 1, 1527, 173)"><g class="a1" transform="translate(9 6)"><circle class="c1" cx="22" cy="22" r="22"/><circle class="d1" cx="22" cy="22" r="20"/></g></g><path class="b1" d="M4,11H16.17L10.58,5.41,12,4l8,8-8,8-1.41-1.41L16.17,13H4Z" transform="translate(1570 213) rotate(180)"/></g></svg>',
            '<svg class="hide-show animate" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="50" viewBox="0 0 62 62"><defs><style>.a{fill:#fff;stroke:white;stroke-width:4px;}.b{stroke:#000;}.c{stroke:none;}.d{fill:none;}.e{filter:url(#a);}.animate .d,.a{animation: load-icon 1.5s linear .4s ;stroke-dasharray: 200;animation-direction: alternate-reverse;}@keyframes load-icon {to {stroke-dashoffset:200;stroke:#EC7F4A;}}</style><filter id="a" x="0" y="0" width="62" height="62" filterUnits="userSpaceOnUse"><feOffset dy="3" input="SourceAlpha"/><feGaussianBlur stdDeviation="3" result="b"/><feFlood flood-opacity="0.161"/><feComposite operator="in" in2="b"/><feComposite in="SourceGraphic"/></filter></defs><g transform="translate(-11 -173)"><g class="e" transform="matrix(1, 0, 0, 1, 11, 173)"><g class="a" transform="translate(9 6)"><circle class="c" cx="22" cy="22" r="22"/><circle class="d" cx="22" cy="22" r="20"/></g></g><path class="b" d="M20,11H7.83l5.59-5.59L12,4,4,12l8,8,1.41-1.41L7.83,13H20Z" transform="translate(54 213) rotate(-180)"/></g></svg>            '
        ], dots: true, nav: true};

    constructor(private metaService: MetaService,
                private router: Router,
                private service: ApiService,
                private authService: AuthService,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
     * ngOnInit()
     */

    public mobile = false;
    public ngOnInit() {
        this.metaService.setTitle('Hire Professional Freelancers | Perfectlancer');
        this.metaService.setDescription('Perfectlancer is a freelancing platform where businesses can hire professional freelancers like Writers, Designers, Developers, Marketers and much more and Get Miles Ahead.');
        if ( isPlatformBrowser(this.platformId) ) {
            window.scrollTo(0, 0);
        }
        // this.service.getGlobalList('popular jobs').subscribe(
        //     res => {
        //         this.jobs = res[0].global_list_items;
        //         if (isPlatformBrowser(this.platformId)) {
        //             window.scrollTo(0, 0);
        //         }
        //     },
        //     err => {
        //         // this.alertService.alertError(err);
        //         //console.log(err);
        //     }
        // );

        // this.service.getWordpressPosts(6).subscribe(
        //     res => {
        //         this.posts = res;
        //     },
        //     err => {
        //         // this.alertService.alertError(err);
        //         //console.log(err);
        //     }
        // );
    }

    /**
     * @param job
     */
    public postProjectLikeThis(job) {
        this.authService.setProjectLikeThis(job);
    }

    /**
     * @param skill
     */
    public postSkill(skill) {
        this.router.navigateByUrl('/post-job?skills='+skill+'&title='+skill);
    }

}
