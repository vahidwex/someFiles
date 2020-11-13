import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { BlockUiService } from '../../tools/blockui-service';
import { MetaService } from '../../tools/meta.service';

@Component({
    selector: 'im-network-error',
    styles: [`        
        .page_404{ padding:40px 0; background:#fff; font-family: 'Arvo', serif;
        }
        .page_404  img{ width:100%;}

        .four_zero_four_bg{

            background-image: url(../../../assets/maintenance.png);
            height: 500px;
            background-position: center;
            background-size: auto 100%;
            background-repeat: no-repeat;
            width: 100%;
        }


        .four_zero_four_bg h1{
            font-size:80px;
        }

        .four_zero_four_bg h3{
            font-size:80px;
        }

        .link_404{
            color: #fff!important;
            padding: 10px 20px;
            background: #39ac31;
            margin: 20px 0;
            display: inline-block;}
        .contant_box_404{ margin-top:-50px;}

    `],
    template: `
        <section class="page_404">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 " style="justify-content: center;display: flex;">
                        <div class="col-sm-10 col-sm-offset-1  text-center">
                            <div class="four_zero_four_bg">
                                <h1 class="text-center fs-20 font-weight-bold"><span class="fs-35">This page is under maintenance.</span>
                                <br/>Please try again.</h1>
                            </div>
                            <div class="contant_box_404">
                                <p></p>

                                <a routerLink="/" style="cursor:pointer;" class="link_404">Back Home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
})

/**
 * This class present network error page in `/500`
 */
export class NetworkErrorComponent implements OnInit {

    constructor(private metaService: MetaService,
                private blockUiService: BlockUiService,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
    * ngOnInit()
    */
    public ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
        this.blockUiService.unBlockPage();
        this.metaService.setTitle('Network Error');
    }

}
