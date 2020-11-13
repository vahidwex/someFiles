import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core"

import { Api } from "../../Services/Api";
import { AuthService } from "../../tools/auth-service";
import { DynamicScriptLoaderService } from '../../tools/dynamicscriptloader-service';
import { ApiService } from "../../Services/Api.Service";

declare let StripeCheckout: StripeCheckoutStatic;

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html'
})

export class CheckoutComponent {

    @HostListener('window:popstate')
    onPopstate() {
        this.handler.close();
    }

    @Input() amount: number;
    @Input() description: string;
    @Input() initData: any;
    @Output() changes = new EventEmitter<any>();

    public handler: StripeCheckoutHandler;

    constructor(private authService: AuthService,
                private dynamicScriptLoader: DynamicScriptLoaderService,
                private service: ApiService) {
    }

    public script1 = false;
    public script2 = false;

    /**
     * ngOnInit()
     */
    public ngOnInit() {
        this.dynamicScriptLoader.load1().then(()=>
        {
            this.script1 = true;
            if(this.script1 && this.script2){
                this.handler = StripeCheckout.configure({
                    key: Api.STRIPE_PUBLIC_KEY,
                    image: Api.WEBSITE_URL + "/assets/images/logo.png",
                    locale: 'auto',
                    token: async (token) => {
                        this.successResponse(token);
                    }
                });
            }
        });
        this.dynamicScriptLoader.load2().then(()=>{
            this.script2 = true;
            if(this.script1 && this.script2){
                this.handler = StripeCheckout.configure({
                    key: Api.STRIPE_PUBLIC_KEY,
                    image: Api.WEBSITE_URL + "/assets/images/logo.png",
                    locale: 'auto',
                    token: async (token) => {
                        this.successResponse(token);
                    }
                });
            }
        });
    }

    /**
     *
     * @param e
     * @returns {Promise<void>}
     */
    public async checkout(e) {
        const user = this.authService.getUser();
        this.handler.open({
            name: 'PerfectLancer',
            description: this.description,
            amount: this.amount,
            email: user.emails[0].value,
        });
        e.preventDefault();
    }

    /**
     *
     * @param data
     */
    public successResponse(data) {
        let requestBody = {
            bid_id: this.initData.bid_id,
            ...data,
        };
        this.service
            .addPayment(requestBody)
            .subscribe(
                result => {
                    this.changes.emit({
                        payment: true,
                        data: this.initData
                    });
                },
                error => {
                    this.changes.emit({
                        payment: false,
                        data: this.initData
                    });
                }
            );
    }
}