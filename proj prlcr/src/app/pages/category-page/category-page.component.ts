import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from "@angular/common";

import { MetaService } from '../../tools/meta.service';
import { AuthService } from '../../tools/auth-service';

import { StaticData } from "../../Services/static-data";
import {MessageService} from "../../Services/message.service";

@Component({
    selector: 'app-category-page',
    styleUrls: ['./category-page.component.css'],
    templateUrl: './category-page.component.html'
})

/**
 * This class present categories page in route `/categories`
 */
export class CategoryPageComponent implements OnInit {

    public titles = StaticData.CATEGORIES;
    public categoryAction = 'Browse';
    public categoryOptions=['Post a project','Browse'];
    public user: any;

    constructor(private route: ActivatedRoute,
                private metaService: MetaService,
                private authService: AuthService,
                private messageService: MessageService,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
     * ngOnInit()
     */
    public ngOnInit() {
        let queryParam = this.route.snapshot.queryParamMap;
        this.user = this.authService.getUser();
        if ( this.user && this.user.role == 'freelancer' ) {
            this.categoryAction = 'Browse';
        }
        const title = 'Browse top freelancers';
        const description = 'Find professional freelancers on Perfectlancer - Find Freelance Writers, Copywriters, Designers, Web Developers, App Developers, Digital Marketers, Data Scientists and Professionals in many other fields.';
        this.metaService.setTitle(title);
        this.metaService.setDescription(description);
        this.setSchema(title, description);
        if ( isPlatformBrowser(this.platformId) ) {
            window.scrollTo(0, 0);
            setTimeout(()=>{
                if(queryParam.get('category') != null){
                    document.getElementById(queryParam.get('category')).style.backgroundColor = '#12dd22';
                    document.getElementById(queryParam.get('category')).style.transition = 'background-color ease-out 0.3s';
                    document.getElementById(queryParam.get('category')).scrollIntoView({block: 'center'});
                    setTimeout(()=>{
                        if ( queryParam.get('category') != null ) {
                            document.getElementById(queryParam.get('category')).style.backgroundColor = '#e6e6e6';
                        }
                    },400)
                }
                if ( document.getElementById('my-public-header') ) {
                    // document.getElementById('my-public-header').style.backgroundColor = '#12dd22';
                }
            },200)
        }
    }

    /**
     *
     */
    private setSchema(title, description) {
        let jsonModel = {
            "@context":"http://schema.org/",
            "@type":["http://schema.org/ItemList"],
            "@id":"https://www.perfectlancer.com/categories/#ItemList",
            "url":"https://www.perfectlancer.com/categories/",
            "alternateName":[title],
            "description":[description],
            "name":[title]
        };
        this.messageService.send('jsonModel', jsonModel);
    }

}
