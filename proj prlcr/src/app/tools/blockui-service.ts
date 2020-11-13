import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";

declare let $: any;

@Injectable()

export class BlockUiService {

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.lottieConfig = {
            path: '../../assets/test.json',
            renderer: 'canvas',
            autoplay: true,
            loop: true
        };
    }

    /**
     *
     */
    public blockPage() {
        if ( isPlatformBrowser(this.platformId) ) {
            $.blockUI({
                css: {
                    backgroundColor: "transparent",
                    border: "none",
                },
                // message: `<div class="spinner">
                //     <span style="color:white">loading</span>
                // <div class="bodymovin p-4" data-icon="http://localhost:8000/data.json"></div>
                // </div>`,
                message: `
                <div class="text-center" style="text-align: center;">
                    <!-- <img style="width:50%; display: inline-block;" class="active" src="/assets/loading-spin.gif"> -->
                    <div class="loader" style="margin: 0 auto;display: flex;justify-content: center;flex-direction: column;">
                        <div class="duo duo1">
                        <div class="dot dot-a" style="background-color: white;"></div>
                        <div class="dot dot-b" style="background-color: white;"></div>
                        </div>
                        <div class="duo duo2">
                        <div class="dot dot-a" style="background-color: white;"></div>
                        <div class="dot dot-b" style="background-color: white;"></div>
                        </div>
                    </div>
                </div>`
            });
        }
    }

    /**
     *
     */
    public unBlockPage() {
        if ( isPlatformBrowser(this.platformId) ) {
            $.unblockUI();
        }
    }

    public lottieConfig: Object;
    private anim: any;
    private animationSpeed: number = 1;


    handleAnimation(anim: any) {
        this.anim = anim;
    }

    stop() {
        this.anim.stop();
    }

    play() {
        this.anim.play();
    }

    pause() {
        this.anim.pause();
    }

    setSpeed(speed: number) {
        this.animationSpeed = speed;
        this.anim.setSpeed(speed);
    }


    /**
     *
     * @param selector
     */
    public blockButton(selector) {
        if ( isPlatformBrowser(this.platformId) ) {
            $(selector).block({
                css: {
                    backgroundColor: "transparent",
                    border: "none",
                },
                message: '...',
            });
            $(selector).attr('disabled', true);
        }
    }

    /**
     *
     * @param selector
     */
    public blockList(selector) {
        if ( isPlatformBrowser(this.platformId) ) {
            $(selector).block({
                css: {
                    backgroundColor: "transparent",
                    border: "none",
                },
                message: `<div class="text-center" style="height: 100%;width: 100%;text-align: center;">
                <div class="loader" style="margin: 0 auto;height: 100vh;display: flex;justify-content: center;flex-direction: column;">
                  <div class="duo duo1">
                    <div class="dot dot-a"></div>
                    <div class="dot dot-b"></div>
                  </div>
                  <div class="duo duo2">
                    <div class="dot dot-a"></div>
                    <div class="dot dot-b"></div>
                  </div>
                </div>
            </div>`,
            });
        }
    }

    /**
     *
     * @param selector
     */
    public unBlock(selector) {
        if ( isPlatformBrowser(this.platformId) ) {
            $(selector).unblock();
            $(selector).attr('disabled', false);
        }
    }
}
