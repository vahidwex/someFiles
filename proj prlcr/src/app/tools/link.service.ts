/*
* This service will create link tags in html head.
*
* */

import { Injectable, Optional, RendererFactory2, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class LinkService {

    constructor(
        private rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document) {}

    /**
     * Inject the State into the bottom of the <head>
     */
    addTag(tag: LinkDefinition, forceCreation?: boolean) {

        try {
            const renderer = this.rendererFactory.createRenderer(this.document, {
                id: '-1',
                encapsulation: ViewEncapsulation.None,
                styles: [],
                data: {},
            });

            const link = renderer.createElement('link');
            const head = this.document.head;
            const selector = this._parseSelector(tag);

            if (head === null) {
                throw new Error('<head> not found within DOCUMENT.');
            }

            Object.keys(tag).forEach((prop: string) => {
                return renderer.setAttribute(link, prop, tag[prop]);
            });``
            renderer.appendChild(head, link);

        } catch (e) {
            console.error('Error within linkService : ', e);
        }
    }

    removeCanonicalLink() {
        try {
            const renderer = this.rendererFactory.createRenderer(this.document, {
                id: '-1',
                encapsulation: ViewEncapsulation.None,
                styles: [],
                data: {}
            });
            const canonical = document.querySelector("link[rel='canonical']")
            const head = this.document.head;

            if (head === null) {
                throw new Error('<head> not found within DOCUMENT.');
            }
            if (!!canonical) {
                renderer.removeChild(head, canonical);
            }
        } catch (e) {
            console.error('Error within linkService : ', e);
        }
    }

    removeRelLinks(rel) {
        try {
            const renderer = this.rendererFactory.createRenderer(this.document, {
                id: '-1',
                encapsulation: ViewEncapsulation.None,
                styles: [],
                data: {}
            });
            const prevLink = document.querySelector("link[rel='prev']");
            const nextLink = document.querySelector("link[rel='next']");
            const head = this.document.head;

            if (head === null) {
                throw new Error('<head> not found within DOCUMENT.');
            }
            if ( rel == 'next' && !!nextLink ) {
                renderer.removeChild(head, nextLink);
            }
            if ( rel == 'prev' && !!prevLink ) {
                renderer.removeChild(head, prevLink);
            }
        } catch (e) {
            console.error('Error within linkService : ', e);
        }
    }

    private _parseSelector(tag: LinkDefinition): string {
        // Possibly re-work this
        const attr: string = tag.rel ? 'rel' : 'hreflang';
        return `${attr}="${tag[attr]}"`;
    }
}

export declare type LinkDefinition = {
    charset?: string;
    crossorigin?: string;
    href?: string;
    hreflang?: string;
    media?: string;
    rel?: string;
    rev?: string;
    sizes?: string;
    target?: string;
    type?: string;
} & {
    [prop: string]: string;
};
