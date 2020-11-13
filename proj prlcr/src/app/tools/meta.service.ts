import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

import { LinkService } from './link.service';
import { Api } from "../Services/Api";

@Injectable()

/**
 * PerfectLancer meta service will work with meta tag in html header and help in SEOs.
 * include: Meta description - Meta keyword - Title - Canonicals
 */
export class MetaService {

    constructor(private metaService: Meta,
                private titleService: Title,
                @Inject(DOCUMENT) private doc,
                private linkService: LinkService) {}

    /**
     * This method will set description meta.
     *
     * @param {string} metaDescription
     */
    public setDescription(metaDescription: string) {
        this.metaService.updateTag(
            {
                name: 'description',
                content: metaDescription,
            });
        this.clearOgTags();
    }

    /**
     * This method will return current description.
     * @returns {promise.Promise<string> | string}
     */
    public getDescriptionTag() {
        // behnam **
        if(this.metaService.getTag('name=description')){
            return(this.metaService.getTag('name=description').content);
        }

        let metas = document.getElementsByTagName('meta');
        for ( let i = 0; i < metas.length; i++ ) {
            if ( metas[i].getAttribute('name') == 'description' ) {
                return metas[i].getAttribute('content');
            }
        }
    }

    /**
     * This method will set keyword meta.
     *
     * @param {string} metaKeyword
     */
    public setKeyword(metaKeyword: string) {
        this.metaService.updateTag(
            {
                name: 'keywords',
                content: metaKeyword,
            });
    }

    /**
     * This method will change the meta keyword and meta description to default values.
     */
    public clearMetaTags() {
        this.metaService.updateTag(
            {
                name: 'description',
                content: 'Perfectlancer is a freelancing platform where businesses can hire professional freelancers and get miles ahead',
            });
        this.metaService.updateTag(
            {
                name: 'keywords',
                content: 'Migration, Immigration, Agency',
            });
    }

    /**
     * This method will fire to set title to head of html.
     *
     * @param {string} newTitle
     */
    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
        this.clearOgTags();
    }

    /**
     * This method will return the current title of site.
     *
     * @returns {string}
     */
    public getTitle() {
        return this.titleService.getTitle();
    }

    /**
     * This method will change the title to default.
     */
    public clearTitle() {
        this.setTitle('PerfectLancer');
    }

    /**
     * This method will add/renew rel=next for pagination in html head.
     *
     * @param {string} url
     */
    public setMetaWithRelNext(url: string) {
        this.linkService.removeRelLinks('next');
        if (url == null) {
            return true;
        }
        if (url.indexOf('https') === -1) {
            url = 'https://perfectlancer.com' + url;
        }
        // this.linkService.addTag( { rel: 'next', href: url } );
        let link: HTMLLinkElement = this.doc.createElement('link');
        link.setAttribute('rel', 'next');
        this.doc.head.appendChild(link);
        link.setAttribute('href', url);
    }

    /**
     * This method will add/renew rel=prev for pagination in html head.
     *
     * @param {string} url
     */
    public setMetaWithRelPrev(url: string) {
        this.linkService.removeRelLinks('prev');
        if (url == null) {
            return true;
        }
        if (url.indexOf('https') === -1) {
            url = 'https://perfectlancer.com' + url;
        }
        // this.linkService.addTag( { rel: 'next', href: url } );
        let link: HTMLLinkElement = this.doc.createElement('link');
        link.setAttribute('rel', 'prev');
        this.doc.head.appendChild(link);
        link.setAttribute('href', url);
    }

    /**
     * This method will set canonical in html header.
     *
     * @param {string} url
     */
    public setCanonical(url: string) {
        this.linkService.removeCanonicalLink();
        if (url.indexOf('https') === -1) {
            url = 'https://perfectlancer.com' + url;
        }
        this.linkService.addTag({rel: 'canonical', href: url});
    }

    /**
     * This method will return the current canonical.
     *
     * @returns {string}
     */
    public getCanonical() {
        return document.getElementById('canonical').getAttribute('href');
    }

    /**
     * This method will change the canonical to default.
     */
    public clearCanocical() {
        this.linkService.removeCanonicalLink();
        this.linkService.addTag({rel: 'canonical', href: 'https://perfectlancer.com/'});
    }

    /**
     *
     * @param {any} url
     */
    public clearOgTags(url = null) {
        const metas = this.doc.getElementsByTagName('meta');
        let pageTitle = this.getTitle();
        // get page title
        let pageUrl = url ? url : this.doc.URL;
        if ( pageUrl.indexOf('http') == -1 ) {
            pageUrl = Api.WEBSITE_URL + pageUrl;
        }
        let pageDescription = this.getDescriptionTag();

        let validRoute = [
            {
                name: "og:title",
                value: pageTitle
            },
            {
                name: "og:type",
                value: 'website'
            },
            {
                name: "og:url",
                value: pageUrl
            },
            {
                name: "og:image",
                value: Api.WEBSITE_URL + '/assets/images/logo-og.png'
            },
            {
                name: "og:image:type",
                value: 'image/png'
            },
            {
                name: "og:image:width",
                value: '200'
            },
            {
                name: "og:image:height",
                value: '200'
            },
            {
                name: "og:image:alt",
                value: Api.WEBSITE_URL
            },
            {
                name: "og:description",
                value: pageDescription
            },
            {
                name: "og:locale",
                value: "en"
            },
            {
                name: "og:site_name",
                value: Api.WEBSITE_URL,
            },
            {
                name: "twitter:site",
                value: "perfect_lancer"
            },
            {
                name: "twitter:title",
                value: pageTitle
            },
            {
                name: "twitter:description",
                value: pageDescription
            },
        ];

        let validRouteProfile = [
            "og:site_name",
            "og:type",
            "og:image",
        ];

        for (let i = 0; i < metas.length; i++) {
            if ( metas[i].getAttribute('property') ) {
                for ( let item of validRouteProfile ) {
                    let metaName = metas[i].getAttribute('property');
                    if ( item == metaName ) {
                        this.metaService.updateTag({ property: metaName, content: null });
                        break;
                    }
                }
            }
        }
        for ( let item of validRoute ) {
            this.metaService.updateTag({ property: item.name, content: item.value });
        }
        let head = this.doc.getElementsByTagName('head')[0];
        head.setAttribute('prefix', 'og: http://ogp.me/ns#');
    }

}
