import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

import { TokenService } from "../Services/token.service";
import { AuthService } from "../tools/auth-service";

@Injectable()

export class TokenGuardEmployerService implements CanActivate {

    constructor(private router: Router,
                private token: TokenService,
                private authService: AuthService,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
     *
     * @param prev
     * @param next
     * @returns {boolean}
     */
    public canActivate(prev, next) {
        if ( !isPlatformBrowser(this.platformId) ) {
            return true;
        }

        if( this.token.getToken() && this.authService.getUser() && this.authService.getUser().role == 'employer' ) {
            return true;
        }
        // this.router.navigate(['/login'], {queryParams: {redirect_link: next.url}});
        this.router.navigate(['/login']);
        return false;
    }
}
