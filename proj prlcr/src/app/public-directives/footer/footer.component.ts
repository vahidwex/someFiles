import { Component } from '@angular/core';

import { AuthService } from "../../tools/auth-service";

@Component({
    selector: 'app-footer',
    styleUrls: ['./footer.component.css'],
    templateUrl: './footer.component.html'
})

/**
 * This class present website footer.
 */
export class FooterComponent {

    public user: any;

    constructor(private authService: AuthService) { }

    /**
     * ngOnInit()
     */
    public ngOnInit() {
        this.user =  this.authService.getUser();
    }

}
