import { Component, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { BlockUiService } from '../../tools/blockui-service';
import { TokenService } from '../../Services/token.service';
import { AlertService } from '../../tools/alert.service';
import { MetaService } from '../../tools/meta.service'
import { AuthService } from '../../tools/auth-service';
import { ApiService } from '../../Services/Api.Service';

@Component({
    selector: 'app-freelancer',
    styleUrls: ['./freelancer.component.css'],
    templateUrl: './freelancer.component.html'
})

export class FreelancerComponent {


    constructor(private tokenService: TokenService,
                private authService: AuthService,
                private route: ActivatedRoute,
                private router: Router,
                private service: ApiService,
                private alertService: AlertService,
                private metaService: MetaService,
                private blockUiService: BlockUiService,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
     * ngOnInit
     */
    public ngOnInit() {
        this.blockUiService.unBlockPage();
        this.metaService.setTitle('Welcome | Perfectlancer - Freelancers');
        this.metaService.setDescription('Register to Perfectlancer.com and Start getting hired for top freelancing jobs by collaborating in the platform and searching for jobs most relevant to your expertise');
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
    }
    
    public login(){
        this.router.navigateByUrl('/register/freelancer')
    }
}
