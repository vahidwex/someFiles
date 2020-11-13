import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from "rxjs/Rx";
import { isPlatformBrowser } from "@angular/common";

import { AuthService } from './tools/auth-service';
import { MessageService } from "./Services/message.service";
import { MetaService } from "./tools/meta.service";

import { Api } from "./Services/Api";
import {animation} from "./tools/animations";

@Component({
    animations: [animation],
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent {

    public title = 'PerfectLancer';
    public schema = {
        "@context": "http://schema.org",
        "@type": "Organization",
        "name": "Perfectlancer",
        "url": Api.WEBSITE_URL,
        "logo": Api.WEBSITE_URL + '/assets/images/logo-og.png',
        "description": 'Perfectlancer is a freelancing platform where businesses can hire professional freelancers and get miles ahead',
        "sameAs": [
            "https://fb.me/Perfectlancerofficial",
            "https://twitter.com/perfect_lancer",
            "https://www.linkedin.com/company/perfectlancer",
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "11755 Wilshire Blvd. Suite 1250, Los Angeles, CA 90025",
            "addressRegion": "Los Angeles",
            "postalCode": "90025",
            "addressCountry": "US"
        }
    };
    public schemaListener: Subscription;
    public showCookieDialog:boolean = false;

  constructor(public authService: AuthService,
              public router: Router,
              private metaService: MetaService,
              private messageService: MessageService,
              @Inject(PLATFORM_ID) private platformId: Object) {
        this.metaService.setTitle('Hire Professional Freelancers | Perfectlancer');
        this.metaService.setDescription('Perfectlancer is a freelancing platform where businesses can hire professional freelancers and get miles ahead');
        this.router.events.subscribe((path) => {
            if ( path instanceof NavigationEnd ) {
                // Change Canonicals base on new page
                this.metaService.setCanonical(path.url);
                this.metaService.clearOgTags(path.url);
            }
        });
        this.schemaListener =  this.messageService
            .get()
            .subscribe(message => {
                if ( message.key == 'jsonModel' ) {
                    this.schema = message.value;
                }
            });
  }

    /**
     * ngOnInit()
     */
    public ngOnInit() {
        if ( isPlatformBrowser(this.platformId) &&  !localStorage.getItem('check-cookie') ) {
            this.showCookieDialog = true;
        }
    }

    /**
     * @returns {boolean}
     */
    public checkRoute() {
        if ( this.router.url.includes('register') ||
             this.router.url.includes('login') ||
             this.router.url.includes('forgot-password') ) {
            return false;
        }
        return true;
    }

    public checkRouteForTransparent(){
        if ( this.router.url.includes('register') ||
             this.router.url.includes('login') ||
             this.router.url.includes('forgot-password') ||
             this.router.url.includes('how-it-works') ||
             this.router.url.includes('welcome') ||
             this.router.url.includes('categories') ||
             this.router.url.includes('post-job') ||
             this.router.url.includes('search') ||
             this.router.url.includes('terms') ||
             this.router.url.includes('about') ||
             this.router.url.includes('FAQ') ||
             this.router.url.includes('freelancer')
              ) {
            return true;
        }
        return false;
    }

    /**
     *
     */
    public onRemoveCookieDialog() {
        this.showCookieDialog = false;
        localStorage.setItem('check-cookie', 'accepted');
    }
}
