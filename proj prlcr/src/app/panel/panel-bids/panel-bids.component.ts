import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {BlockUiService} from '../../tools/blockui-service';

import { AlertService } from '../../tools/alert.service';
import { MetaService } from '../../tools/meta.service';
import { ApiService } from '../../Services/Api.Service';
import { AuthService } from '../../tools/auth-service';


import { AddCardComponent } from "../../public-directives/add-card/add-card.component";

@Component({
    selector: 'app-panel-bids',
    styleUrls: ['./panel-bids.component.scss'],
    templateUrl: './panel-bids.component.html'
})

/**
 * This class present employer/freelancer bids page in route `/panel/bids/:projectId`
 */
export class PanelBidsComponent {

    @ViewChild('addCard', {static: true}) public addCard: AddCardComponent;

    public projectId:string = null;
    public status:string = null;
    public pagination:any = {
        limit: 10,
        offset: 0
    };
    public user: any = null;
    public bidsStatus = ['all', 'accepted', 'pending', 'modified', 'declined'];
    public bids:any[] = [];
    public dataSource: any = 0;
    public bid_id: any;
    public collapsed: any = [{}];
    public skillcollapsed: any = [{}];
    public firstTime = true;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private authService: AuthService,
                private service: ApiService,
                private blockui: BlockUiService,
                private alertService: AlertService,
                private metaService: MetaService,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
     * ngOnInit()
     */
    public ngOnInit() {
        this.metaService.setTitle('Bids');
        if ( isPlatformBrowser(this.platformId) ) {
            window.scrollTo(0, 0);
        }
        this.user = this.authService.getUser();
        this.route.paramMap.subscribe(param => {
            let projectParam = param.get('projectId');
            if ( projectParam ) {
                this.projectId = projectParam;
            }
            if ( this.user && this.user.role == 'freelancer' ) {
                this.status = 'all';
            }
            this.blockui.blockPage();
            this.getBids();
        });
    }

    /**
     * Call service to load bids.
     */
    public getBids() {
        this.service
            .getBids(
                this.projectId,
                this.status,
                this.pagination.limit,
                this.pagination.offset,
            )
            .subscribe(
                result => this.onLoadBidsSuccess(result),
                error => this.onLoadBidsError(error));
    }

    /**
     * This method will fire if bids loaded successfully.
     *
     * @param response
     */
    public onLoadBidsSuccess(response) {
        this.blockui.unBlockPage();
        if (response) {
            this.bids = response;

            if ( this.projectId ) {
                this.bids.forEach(item => {
                    if ( item.status == 'accepted' ) {
                        this.router.navigateByUrl('/panel/workdiary/' + item.projects_project_id);
                    }
                });
            }
        }
    }

    public isCollapsed(id) {
        return this.collapsed[id];
    }

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
     * This method will fire if service failed to load bids data.
     *
     * @param error
     */
    public onLoadBidsError(error) {
        this.blockui.unBlockPage();
        console.error(error);
        this.alertService.alertError('Failed to load bids.');
    }

    public closeDropDown(id) {
        document.getElementById('dropdown-content' + id).style.display = 'none';
    }

    public openDropDown(id) {
        if (document.getElementById('dropdown-content' + id).style.display != 'block') {
            document.getElementById('dropdown-content' + id).style.display = 'block';
        } else {
            document.getElementById('dropdown-content' + id).style.display = 'none';
        }
    }

    public newWindowOpen(e) {
        window.open(e);
    }

    public onOpenChatClick(input) {
        let bid = input.data.bid;
        let state = input.data.state;
        var payload = {
            "user1_id": bid.projects_user_id,
            "user2_id": bid.freelancer_id,
            "session_name": bid.projects_title + ' ' + bid.first_name,
            "project_id": bid.projects_project_id
        };
        this.service
            .LIVECHAT_SESSION(payload)
            .subscribe(
                res => {
                    if (state != 'hire') {
                        this.router.navigateByUrl('/panel/message?project_id=' + bid.projects_project_id);
                    }
                },
                err => {
                    // console.error(err);
                    if (err.code == 409 && state != 'hire') {
                        this.router.navigateByUrl('/panel/message?project_id=' + bid.projects_project_id);
                    }
                    // this.alertService.alertError('Internal Server Error');
                }
            );
    }

    public LIVECHAT_SESSION(bid, state) {
        this.addCard.setInitData({bid: bid, state: state});
        this.addCard.isForceAdd(false);
        this.addCard.openModal();
    }

    public patchBids(bidId, requestBody) {
        this.service
            .patchBids(bidId, requestBody)
            .subscribe(
                res => {
                    if (res) {
                        this.alertService.alertSuccess('patchBids successfull');
                        this.authService.setUser(res);
                    }
                },
                err => {
                    // console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }

    /**
     *
     * @param status
     */
    public onChangeBidsStatusModel(status) {
        this.status = status;
        this.getBids();
    }

    /**
     *
     * @param {any} e
     */
    public getMilestoneOnBid(e = null) {
        if(this.isCollapsed(e)){
            return;
        }else{
            this.dataSource = [{milestone_description:'Loading',milestone_duration:'Loading',budget:'Loading '}];
        }
        this.service
            .getMilestoneBid(e)
            .subscribe(
                res => {
                    if (res) {
                        this.dataSource = res;
                    }
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }

    /**
     *
     * @param data
     * @constructor
     */
    public AcceptBid(data) {
        if (data.payment) {
            let BidId = data.data;
            var model = {
                status: 'accepted'
            };
            this.service
                .patchBids(BidId.bid_id, model)
                .subscribe(
                    res => {
                        this.LIVECHAT_SESSION(BidId, 'hire');
                        this.alertService.alertSuccess('patchBids successfully.');
                        this.closeDropDown(BidId.bid_id);
                        this.router.navigateByUrl('/panel/workdiary/' + this.projectId);
                    },
                    err => {
                        console.error(err);
                        this.alertService.alertError('Internal Server Error');
                    }
                );
        } else {
            this.alertService.alertWarn('Payment aborted');
        }
    }

}
