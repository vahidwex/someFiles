import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from "@angular/common";

import { MetaService } from '../../tools/meta.service';
import { HelperFunction } from "../../tools/helper-function";

@Component({
    selector: 'app-how-it-works',
    styleUrls: ['./how-it-works.component.css'],
    templateUrl: './how-it-works.component.html'
})

export class HowItWorksComponent {

    public tab = 'Employer';
    public expanded: any = [];

    constructor(@Inject(PLATFORM_ID) private platformId: Object,
                private helper: HelperFunction,
                private metaService: MetaService,
                private router: Router) {}

    /**
     * ngOnInit()
     */
    public ngOnInit() {
        if (this.router.url.includes('freelancer')) {
            this.tab = 'Freelancer';
            this.metaService.setTitle('How it works | Freelancer | Freelancing & Hiring Freelancers');
            this.metaService.setDescription('In this page, you can learn how to work with Perfectlancer.com in order to hire freelancers or get hired by clients. We offer you a simple way to perform both jobs.');
        } else if (this.router.url.includes('employer')) {
            this.tab = 'Employer';
            this.metaService.setTitle('How it works | Employer | Freelancing & Hiring Freelancers');
            this.metaService.setDescription('In this page, you can learn how to work with Perfectlancer.com in order to hire freelancers or get hired by clients. We offer you a simple way to perform both jobs.');
        } else if (this.router.url.includes('FAQ')) {
            this.metaService.setTitle('FAQ | Perfectlancer');
            this.tab = 'FAQ';
            this.metaService.setDescription('Browse Frequently Asked Questions to learn about hiring freelance professionals and finding work online.');
        } else {
            this.metaService.setTitle('How it works | Freelancing & Hiring Freelancers');
            this.metaService.setDescription('In this page, you can learn how to work with Perfectlancer.com in order to hire freelancers or get hired by clients. We offer you a simple way to perform both jobs.');
        }

        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
            if (document.getElementById('my-public-header')) {
                document.getElementById('my-public-header').style.backgroundColor = 'var(--dark-color)';
            }
        }
    }

    public imageLoader = false;

    /**
     * ngOnDestroy()
     */
    public ngOnDestroy(): void {
        if (document.getElementById('my-public-header')) {
            document.getElementById('my-public-header').style.backgroundColor = '';
        }
    }
    public post_id = 0;
    public changePost(id){
        this.post_id = id;
    }
    public hire_id = 0;
    public changeHire(id){
        this.hire_id = id;
    }
    public profile_id = 0;
    public changeProfile(id){
        this.profile_id = id;
    }
    public bid_id = 0;
    public changeBid(id){
        this.bid_id = id;
    }
    public doing_id = 0;
    public changeDoing(id){
        if(id == 0){
            this.doing_id = 0;
        }else{
            this.doing_id = 1;
        }
    }
    public doingfl_id = 0;
    public changeDoingfl(id){
        if(id == 0){
            this.doingfl_id = 0;
        }else{
            this.doingfl_id = 1;
        }
    }


    public navigateRegister(page){
        this.router.navigateByUrl('/register/'+page)
    }

    public changeTab(tab) {
        this.tab = tab;
        if (tab == 'Freelancer') {
            this.metaService.setTitle('How it works | Freelancer | Freelancing & Hiring Freelancers');
            this.metaService.setDescription('In this page, you can learn how to work with Perfectlancer.com in order to hire freelancers or get hired by clients. We offer you a simple way to perform both jobs.');
            this.helper.changeRouteParams('how-it-works/freelancer', []);
        } else if (tab == 'Employer') {
            this.metaService.setTitle('How it works | Employer | Freelancing & Hiring Freelancers');
            this.metaService.setDescription('In this page, you can learn how to work with Perfectlancer.com in order to hire freelancers or get hired by clients. We offer you a simple way to perform both jobs.');
            this.helper.changeRouteParams('how-it-works/employer', []);
        } else if (tab == 'FAQ') {
            this.metaService.setTitle('FAQ | Perfectlancer');
            this.metaService.setDescription('Browse Frequently Asked Questions to learn about hiring freelance professionals and finding work online.');
            this.helper.changeRouteParams('FAQ', []);
        }
    }

    public expand(id) {
        if (!this.expanded[id])
            this.expanded[id] = true;
        else if (document.getElementById('collapse' + id).classList.contains('show'))
            this.expanded[id] = !this.expanded[id];
    }

}
