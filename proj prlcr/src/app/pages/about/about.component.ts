import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { BlockUiService } from '../../tools/blockui-service';
import { MetaService } from '../../tools/meta.service';

@Component({
    selector: 'app-about',
     styleUrls: ['./about.component.css'],
    styles: [`
        .terms-item {
            padding-top: 16px;
            padding-bottom: 16px;
            margin: 0px !important;
        }

        p {
            color: black;
            font-size : 1rem;
            text-align: justify;
        }

        .terms-header {
            text-transform: uppercase;
            font-size: var(--font-size-16);
            margin-bottom: 24px;
            margin-top: 16px;
        }

        .card-body {
            padding: 68px 40px;
        }

        .terms-element {
            border-left: 4px solid;
            border-radius: 6px;
            padding-left: 8px;
            margin-bottom: 8px;
        }
    `],
    templateUrl: './about.component.html',
})

/**
 * This class presented Terms and conditions in page in `/terms`
 */
export class AboutComponent {

    public termsItem: any[] = [
        {
          title: 'Use IOS Application',
          description: 'Dynamically disseminate an expanded array of niches after bleeding-edge infomediaries.' +
          ' Proactively simplify real-time applications without front-end intellectual capital. Dynamically productize ' +
          'emerging value rather than best-of-breed applications. Assertively simplify exceptional interfaces rather than alternative services.',
          color: '#f0ad4e',
        },
        {
          title: 'IOS Policies',
          description: 'Dynamically disseminate an expanded array of niches after bleeding-edge infomediaries.' +
          ' Proactively simplify real-time applications without front-end intellectual capital. Dynamically productize ' +
          'emerging value rather than best-of-breed applications. Assertively simplify exceptional interfaces rather than alternative services.',
          color: '#55ca5e',
        },
        {
          title: 'IOS Privacy',
          description: 'Dynamically disseminate an expanded array of niches after bleeding-edge infomediaries.' +
          ' Proactively simplify real-time applications without front-end intellectual capital. Dynamically productize ' +
          'emerging value rather than best-of-breed applications. Assertively simplify exceptional interfaces rather than alternative services.',
          color: '#3629ff',
        }
    ];

    constructor(private metaService: MetaService,
                private blockUiService: BlockUiService,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
    * ngOnInit()
    */
    public ngOnInit() {
        if ( isPlatformBrowser(this.platformId) ) {
            window.scrollTo(0, 0);
        }
        this.blockUiService.unBlockPage();
        this.metaService.setTitle('About Perfectlancer.com | Perfectlancer');
        this.metaService.setDescription('A summary about what is Perfectlancer and how it works - Perfectlancer is a freelancing website where clients can hire professionals in different areas and freelancers can find quality jobs.');
    }

}
