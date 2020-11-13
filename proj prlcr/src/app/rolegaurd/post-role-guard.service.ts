import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

import { AuthService } from "../tools/auth-service";

@Injectable()
export class PostRoleGuardService implements CanActivate {

    constructor(private router: Router,
                private authService: AuthService,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
     * @param prev
     * @param next
     * @returns {boolean}
     */
    public canActivate(prev, next) {

        if ( !isPlatformBrowser(this.platformId) ) {
            return true;
        }

        const user =  this.authService.getUser();
        if ( user && user.role == 'freelancer' ) {
            this.router.navigate(['/panel/profile']);
            return false;
        }
        return true;
    }

}
