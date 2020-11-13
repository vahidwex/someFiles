import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

import { AuthService } from "../tools/auth-service";

@Injectable()
export class FreelancerRoleGuardService implements CanActivate {

    public user: any;

    constructor(private router: Router,
                private authService: AuthService,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
     * @param prev
     * @param next
     * @returns {boolean}
     */
    public canActivate(prev, next) {
        this.user =  this.authService.getUser();
        if ( !isPlatformBrowser(this.platformId) || this.user && this.user.role == 'freelancer' ) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
