import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core"

import { Api } from "../../Services/Api";
import { ApiService } from "../../Services/Api.Service";
import { AlertService } from "../../tools/alert.service";
import { DynamicScriptLoaderService } from '../../tools/dynamicscriptloader-service';
import {AuthService} from "../../tools/auth-service";

declare let Stripe;

@Component({
    selector: 'app-add-card',
    templateUrl: './add-card.component.html'
})

export class AddCardComponent {

    @ViewChild('cardElement', {static: true}) cardElement: ElementRef;
    @ViewChild('modalCloser', {static: true}) modalCloser: ElementRef;
    @ViewChild('modalOpener', {static: true}) modalOpener: ElementRef;

    @Input() initData: any;
    @Input() title: any;
    @Input() forceAdd: boolean;
    @Output() changes = new EventEmitter<any>();

    public stripe:any = null;
    public card:any = null;
    public cardErrors:any = null;

    constructor(private service: ApiService,
                private authService: AuthService,
                private dynamicScriptLoader: DynamicScriptLoaderService,
                private alertService: AlertService) {}

    /**
     * ngOnInit()
     */
    public script1 = false;
    public script2 = false;

    public ngOnInit() {
        this.dynamicScriptLoader.load1().then(()=>
        {
            this.script1 = true;
            if(this.script1 && this.script2){
                this.stripe = Stripe(Api.STRIPE_PUBLIC_KEY);
                const elements = this.stripe.elements();

                this.card = elements.create('card');
                this.card.mount(this.cardElement.nativeElement);

                this.card.addEventListener('change', ({ error }) => {
                    this.cardErrors = error && error.message;
                });
            }
        });
        this.dynamicScriptLoader.load2().then(()=>{
            this.script2 = true;
            if(this.script1 && this.script2){
                this.stripe = Stripe(Api.STRIPE_PUBLIC_KEY);
                const elements = this.stripe.elements();

                this.card = elements.create('card');
                this.card.mount(this.cardElement.nativeElement);

                this.card.addEventListener('change', ({ error }) => {
                    this.cardErrors = error && error.message;
                });
            }
        });

        
    }

    /**
     * ngOnChanges()
     * @param $change
     */
    public ngOnChanges($change) {
        if ( $change.initData && $change.initData.currentValue ) {
            this.initData = $change.initData.currentValue;
        }
    }

    /**
     *
     * @param data
     */
    public setInitData(data) {
        this.initData = data;
    }

    public isForceAdd(data){
        this.forceAdd = data;
    }

    /**
     *
     */
    public openModal() {
        if ( this.authService.isCardVerified() ) {
            this.emitData('skip');
        } else {
            this.modalOpener.nativeElement.click();
        }
    }

    /**
     *
     * @param e
     * @returns {Promise<void>}
     */
    async handleForm(e) {
        e.preventDefault();

        const { token, error } = await this.stripe.createToken(this.card);

        if (error) {
            this.cardErrors = error.message;
        } else {
            this.successResponse(token);
        }
    }

    /**
     *
     * @param data
     */
    public successResponse(data) {
        this.service
            .addCard(data)
            .subscribe(
                result => {
                    this.authService.verifyCard();
                    this.emitData('success');
                },
                error => {
                    this.alertService.alertError('Somethings went wrong, Please check form and try again.')
                }
            );
    }

    /**
     *
     * @param {string} status
     */
    public emitData(status = 'skip') {
        this.modalCloser.nativeElement.click();
        this.changes.emit({
            status: status,
            data: this.initData,
        })
    }

}
