import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core"

import {Router, ActivatedRoute, Params} from '@angular/router';
import { Api } from "../../Services/Api";
import { ApiService } from "../../Services/Api.Service";
import { AlertService } from "../../tools/alert.service";
import { DynamicScriptLoaderService } from '../../tools/dynamicscriptloader-service';
import {AuthService} from "../../tools/auth-service";

declare let Stripe;

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})

export class PaginationComponent {

    @Input() length: any;
    @Input() pageIndex: any;
    @Input() pageSize: any;
    @Output() changes = new EventEmitter<any>();

    constructor(private service: ApiService,
                private authService: AuthService,
                private router: Router,
                private alertService: AlertService) {}

    /**
     * ngOnInit()
     */

    public user: any = null

    public ngOnInit() {
        this.user = this.authService.getUser();
    }

    public next(){
        if(((parseInt(this.pageIndex) + 1) * parseInt(this.pageSize) < parseInt(this.length)) && this.pageIndex == 0 && !this.user){
            this.alertService.alertWarn("You need to Register/Login to see other projects");
            this.router.navigateByUrl('/register');
        }
        if(((parseInt(this.pageIndex) + 1) * parseInt(this.pageSize) < parseInt(this.length)))
        {
            this.pageIndex++;
            this.emitData();
        }
    }

    public prev(){
        if(this.pageIndex != 0)
        {
            this.pageIndex--;
            this.emitData();
        }
    }

    getIndex(){
        return parseInt(this.pageIndex);
    }

    public emitData() {
        this.changes.emit({
            data: this.pageIndex,
        })
    }

}
