import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BlockUiService } from '../../tools/blockui-service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { BidDialog } from "../../public-directives/bid-dialog/bid-dialog";
import { BuyBidDialog } from "../../public-directives/buy-bid-dialog/buy-bid-dialog";

import { ApiService } from '../../Services/Api.Service';
import { AlertService } from '../../tools/alert.service';
import { MetaService } from '../../tools/meta.service';
import { AuthService } from "../../tools/auth-service";
import { MatDialog } from '@angular/material/dialog';

import { Api } from "../../Services/Api";

import { StaticData } from "../../Services/static-data";

import { HelperFunction } from "../../tools/helper-function";

interface filter {
    id: string;
    name: string;
    items: any[];
}

interface project {
    title: string;
    localOnly: string;
    description: string;
    createAt: string;
    skills: string[];
    rate: string;
    paymentVerify: boolean;
    numberOfProposals: string;
    totalSpent: string;
    projectType: string;
    budget: string;
    seniorityLevel: string;
    location: string;
}

@Component({
    selector: 'app-bookmark',
    styleUrls: ['./bookmark.component.css'],
    templateUrl: './bookmark.component.html'
})

export class BookmarkComponent {

    public uploadUrl = Api.FILE_ADDRESS;
    public user = null;
    public projects: any;
    public collapsed: any = [{}];
    public skillcollapsed: any = [{}];
    public firstTime = true;
    public first = false;
    public total_bid = 0;
    public remain_bid = NaN;

    constructor(private service: ApiService,
                private route: ActivatedRoute,
                private router: Router,
                private authService: AuthService,
                private helper: HelperFunction,
                private blockui: BlockUiService,
                private metaService: MetaService,
                public dialog: MatDialog,
                private alertService: AlertService,
                @Inject(PLATFORM_ID) private platformId: Object) {}


    public onlyCountry = null;
    public countries = StaticData.COUNTRIES;

    /**
     * ngOnInit()
     */
    public ngOnInit() {
        this.metaService.setTitle('Bookmarked Jobs | Perfectlancer');
        this.metaService.setDescription('Search for high paying freelance jobs and get hired - With Perfectlancer, you can find a wide range of jobs to work in like Translation, Sales and Marketing, Technical Writing and Proof Reading, UI/UX and many more...');
        this.blockui.blockPage();
        this.user = this.authService.getUser();
        this.getProjects();
        this.checkBid();
        if ( isPlatformBrowser(this.platformId) ) {
            if (document.getElementById('my-public-header')) {
                document.getElementById('my-public-header').style.backgroundColor = 'var(--dark-color)';
            }
        }
    }

    /**
     *
     * @param id
     */
    public collapse(id) {
        // var tmp : any = document.getElementById(id);
        this.firstTime = false;
        if (this.collapsed[id] == true) {
        } else {
            this.collapsed = [{}];
            this.collapsed[id] = true;
            setTimeout(() => {
                var elmnt = document.getElementById(id);
                elmnt.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 50);
        }
    }

    /**
     *
     * @param id
     */
    public unbookmarkProject(id) {
        if ( this.user && this.user.role ) {
            this.service.unbookmark(id)
                .subscribe(
                res => {
                    if(this.projects.length != 0){
                        this.projects.forEach(element => {
                            if ( element &&  element.project_id == id ) {
                                this.projects.splice(this.projects.lastIndexOf(element), 1);
                            }
                        });    
                    }
                },
                err => {
                    this.alertService.alertError(err.body.error);
                }
            );
        }
    }


    /**
     *
     * @param project
     */
    public bidOnProject(project) {
        this.service.getMyBidCount()
            .subscribe(
            res => {
                if ( res ) {
                    if (this.remain_bid > 2) {
                        this.openDialog(project);
                    } else {
                        this.alertService.alert('Insufficient bid count please charge your account.');
                    }
                }
            },
            err => {
                this.alertService.alertError(err.body.error);
            }
        );
    }

    /**
     *
     * @param e
     */
    public newWindowOpen(e) {
        window.open(e);
    }

    /**
     *
     * @param project
     */
    public postProjectLikeThis(project) {
        this.authService.setProjectLikeThis(project);
        this.router.navigateByUrl('/post-job');
    }

    /**
     *
     * @param id
     * @returns {any}
     */
    public isCollapsed(id) {
        return this.collapsed[id];
    }

    /**
     *
     * @param id
     */
    public closeAll(id) {
        if (this.collapsed[id]) {
            this.collapsed[id] = false;
            setTimeout(() => {
                var elmnt = document.getElementById(id);
                elmnt.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 50);
        }
    }

    /**
     *
     * @param project
     */
    public openDialog(project: any): void {
        const dialogRef = this.dialog.open(BidDialog, {
            width: '728px',
            height: '90%',
            data: project
        });

        dialogRef.afterClosed().subscribe(result => {
            this.checkBid();
        });
    }

    /**
     *
     * @param {Event} event
     */
    public openBuyBidDialog(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        const dialogRef = this.dialog.open(BuyBidDialog, {
            width: '728px',
            height: 'auto',
            data: this.user.first_name
        });

        dialogRef.afterClosed().subscribe(result => {
            this.checkBid();
            // //console.log('The dialog was closed');
        });
    }


    /**
     *
     */
    public getProjects() {
        this.service
                .getBookmarks()
                .subscribe(
                    response => {
                        if ( response ) {
                            this.projects = response;
                        }
                        this.blockui.unBlockPage();
                    },
                err => {
                        this.alertService.alertError(err.body.error);
                        this.blockui.unBlockPage();
                    }
            );
    }

    private checkBid() {
        if ( this.user && this.user.role == 'freelancer' ) {
            this.service.getMyBidCount()
                .subscribe(
                res => {
                    if ( res ) {
                        let tmpTotalBid = 0
                        let tmpRemainBid = 0
                        res.bids.forEach(function(entry) {
                            tmpTotalBid = tmpTotalBid + entry.total_bid;
                        });
                        res.bids.forEach(function(entry) {
                            tmpRemainBid = tmpTotalBid - entry.used_bid;
                        });
                        this.total_bid = tmpTotalBid;
                        this.remain_bid = tmpRemainBid;
                    }
                },
                err => {
                    this.alertService.alertError(err.body.error);
                }
            );
        }
    }

}
