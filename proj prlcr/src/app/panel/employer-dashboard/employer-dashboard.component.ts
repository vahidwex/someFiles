import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from "../../tools/auth-service";
import {MetaService} from '../../tools/meta.service';
import { ApiService } from "../../Services/Api.Service";
import {isPlatformBrowser} from "@angular/common";
import { StaticData } from "../../Services/static-data";

@Component({
    selector: 'app-employer-dashboard',
    templateUrl: './employer-dashboard.component.html',
    styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerDashboardComponent implements OnInit {

    public items = [1,2,3,4,5,6,7,8];
    public jobs :[{}];
    public titles = StaticData.CATEGORIES;

    constructor(public authService: AuthService,
                private route: ActivatedRoute,
                private metaService: MetaService,
                private router: Router,
                private service: ApiService,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
     * ngOnInit()
     */

    public ngOnInit() {
        this.metaService.setTitle('Dashboard | Perfectlancer');
        this.metaService.setDescription('Here you can customize your account and view your information on Perfectlancer and modify them.');
        if ( isPlatformBrowser(this.platformId) ) {
            setTimeout(()=>{
                document.getElementById('lines').classList.add('newclass1');
                document.getElementById('post-job').classList.add('newclass');
            },300);
            // this.service.getGlobalList('popular jobs').subscribe(
            //     res => {
            //         this.jobs = res[0].global_list_items;
            //     },
            //     err => {
            //         // this.alertService.alertError(err);
            //         // //console.log(err);
            //     }
            // );
            // this.service.getGlobalList('popular categories').subscribe(
            //     res => {
            //         this.titles = res[0].global_list_items;
            //     },
            //     err => {
            //         // this.alertService.alertError(err);
            //         // //console.log(err);
            //     }
            // );
            this.getprojects();
        }
    }

    postProjectLikeThis(job){
        this.authService.setProjectLikeThis(job);
        this.router.navigateByUrl('/post-job');
    }
    public projects:any = [];

    public getTime(time){
        var date = new Date(time);
        return (date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay());
    }

    public getprojects() {
        this.service.getMyProjectsWithStatus('in progress').subscribe(
            res => {
                if (res) {
                    this.projects = res;
                }
            },
            err => {
                // this.alertService.alertError('No internet connection.');
            }
        );
    }

}