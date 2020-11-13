import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { TokenService } from "../../Services/token.service";
import { BlockUiService } from "../../tools/blockui-service";
import { AuthService } from "../../tools/auth-service";

@Component({
    selector: 'app-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    public userType: string = '';
    public user: any;
    public avatar = '';

    constructor(public router: Router,
                private authService: AuthService,
                private blockUiService: BlockUiService,
                private tokenService: TokenService) {}

    /**
     * ngOnInit()
     */
    public ngOnInit() {
        this.userType = this.authService.getUserType();
        // if ( this.userType == null ) {}
        this.user =  this.authService.getUser();
    }

    /**
     * This method will fire if user click on logout button.
     */
    public onLogoutClick() {
        this.blockUiService.blockPage();
        this.tokenService.logOutUser();
        this.authService.deleteUser();
	}

}
