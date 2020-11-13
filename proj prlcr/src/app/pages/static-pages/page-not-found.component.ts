import { Component, Inject, OnInit, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Location } from '@angular/common';

import { BlockUiService } from '../../tools/blockui-service';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { MetaService } from '../../tools/meta.service';

@Component({
    selector: 'app-page-not-found',
    styles: [`
        .page_404{ padding:40px 0; background:#fff; font-family: 'Arvo', serif;
        }
        .page_404  img{ width:100%;}

        .four_zero_four_bg{

            background-image: url(../../../assets/images/404.png);
            height: 400px;
            background-position: center;
            background-size: auto 100%;
            background-repeat: no-repeat;
        }

        h1{
            line-height:1 !important;
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
                    <div class="col-sm-12 " style="    justify-content: center;
        display: flex;
      ">
                        <div class="col-sm-10 col-sm-offset-1  text-center">
                            <div class="four_zero_four_bg">
                                <h1 class="text-center ">404</h1>
                            </div>
                            <div class="contant_box_404">
                                <h3 class="h2">
                                    Look like you're lost
                                </h3>
                                <p>The page you are looking for is not available!</p>
                                
                                <a (click)="goBack()" style="cursor:pointer;" class="link_404">Go Back</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </section>
  `,
})

/**
 * This class present page not found page in `/404`
 */
export class PageNotFoundComponent implements OnInit {

    constructor(private blockUiService: BlockUiService,
                private metaService: MetaService,
                private location : Location,
                @Optional() @Inject(RESPONSE) private response: any,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
    * ngOnInit()
    */
    public ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0);
        }
        this.blockUiService.unBlockPage();
        this.metaService.clearTitle();
        // if (!isPlatformBrowser(this.platformId)) {
        //     this.response.statusCode = 404;
        //     this.response.statusMessage = '404 - Page Not Found';
        // }
    }

    public goBack() {
        this.location.back();
    }

}
