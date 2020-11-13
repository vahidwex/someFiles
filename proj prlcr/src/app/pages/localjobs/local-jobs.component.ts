import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { BlockUiService } from '../../tools/blockui-service';
import {StaticData} from "../../Services/static-data";
import { MetaService } from '../../tools/meta.service';

@Component({
    selector: 'app-local-jobs',
    styleUrls: ['./local-jobs.component.css'],
    styles: [`
        .terms-item {
            padding-top: 16px;
            padding-bottom: 16px;
            margin: 0px !important;
        }
        a:hover{
            color: var(--clickable-orange) !important;
        }

        p {
            color:black;
            font-size: 14px;
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
    templateUrl: './local-jobs.component.html',
})

/**
 * This class presented Terms and conditions in page in `/terms`
 */
export class LocalJobsComponent {

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
        this.metaService.setTitle('Local jobs | Perfectlancer');
        this.metaService.setDescription('Search for high paying freelance jobs in your country and get hired - With Perfectlancer, you can find a wide range of jobs to work in like Translation, Sales and Marketing, Technical Writing and Proof Reading, UI/UX and many more...');
    }

    public countries = StaticData.COUNTRIES;

}
