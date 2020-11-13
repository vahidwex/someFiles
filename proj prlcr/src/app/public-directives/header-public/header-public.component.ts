import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-header-public',
    styleUrls: ['./header-public.component.css'],
    templateUrl: './header-public.component.html'
})

export class HeaderPublicComponent implements OnInit {

    @HostListener("window:scroll", []) onWindowScroll() {
        const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (document.getElementById('tophover') && number > (document.getElementById('tophover').offsetHeight - 76)) {
            this.backgroundHeader = true;
        } else {
            this.backgroundHeader = false;
        }
    }

    public backgroundHeader = false;

    constructor() {}

    /**
     * ngOnInit()
     */
    public ngOnInit() {}

}
