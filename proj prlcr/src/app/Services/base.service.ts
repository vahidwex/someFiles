import { Injectable, Injector } from "@angular/core";
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from "@angular/router";
import { Api } from "./Api";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertService } from "../tools/alert.service";
import { BlockUiService } from "../tools/blockui-service";
import { AuthService } from "../tools/auth-service";

@Injectable()

export class BaseService {

    public api: any = Api;
    public http: HttpClient;
    public router: Router;
    public barService: any;
    public alertService: any;
    public blockUiService: any;
    public authService: any;
    public httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    };

    constructor(injector: Injector) {
        this.http = injector.get(HttpClient);
        this.router = injector.get(Router);
        this.barService = injector.get(LoadingBarService);
        this.alertService = injector.get(AlertService);
        this.blockUiService = injector.get(BlockUiService);
        this.authService = injector.get(AuthService);
    }

    /**
     * This method will prepare get request.
     *
     * @param url
     * @param Header
     * @returns {Observable<HttpResponse<Object>>}
     */
    public httpGet(url, Header = null) {
        this.barService.start();
        return this.http.get(url, {observe: 'response', headers: Header});
    };

    /**
     * This method will prepare post request.
     *
     * @param url
     * @param body
     * @param options
     * @returns {Observable<Object>}
     */
    public httpPost(url, body, options = null) {
        this.barService.start();
        if ( !options || (options && !options.observe) ) {
            if (!options) {
                options = {};
            }
            options["observe"] = "response";
        }
        return this.http.post<any>(url, body, options);
    }

    /**
     * This method will prepare put request.
     *
     * @param url
     * @param body
     * @param options
     * @returns {Observable<Object>}
     */
    public httpPut(url, body, options = null) {
        this.barService.start();
        if ( !options || (options && !options.observe) ) {
            if (!options) {
                options = {};
            }
            options["observe"] = "response";
        }
        return this.http.put<any>(url, body, options);
    }

    /**
     * This method will prepare path request.
     *
     * @param url
     * @param body
     * @param options
     * @returns {Observable<Object>}
     */
    public httpPatch(url, body, options = null) {
        this.barService.start();
        if ( !options || (options && !options.observe) ) {
            if (!options) {
                options = {};
            }
            options["observe"] = "response";
        }
        return this.http.patch<any>(url, body, options);
    }

    /**
     * This method will prepare delete request.
     *
     * @param url
     * @param options
     * @returns {Observable<ArrayBuffer>}
     */
    public httpDelete(url, options = null) {
        this.barService.start();
        if ( !options || (options && !options.observe) ) {
            if (!options) {
                options = {};
            }
            options["observe"] = "response";
        }
        return this.http.delete<any>(url, options);
    }

    /**
     * This method will handle success response of API.
     *
     * @param response
     * @param observable
     * @constructor
     */
    public handleSuccessResponse(response, observable) {
        this.barService.complete();
        if ( response.body || response.status == 204 || response.status == 200 || response.status == 201 ) {
            observable.next(response.body ? response.body : '');
            return observable.complete();
        }
        let tempModel = {Error: "Some error returned unreadable"};
        return observable.error(JSON.stringify(tempModel));
    }

    /**
     * This method will handle error response of API.
     *
     * @param error
     * @param observable
     * @constructor
     */
    public handleFailedResponse(error, observable) {
        this.barService.complete();
        if( error.status && error.status == 304 ){
            observable.next(error);
            return observable.complete();
        }
        if ( typeof error.status !== 'undefined' && error.status === 0 ) {
            this.alertService.alertWarn('No network connection.');
        }
        if ( error.status && error.status.toString()[0] === "5" ) {
            this.router.navigate(["/500"]);
            return;
        }
        if ( error.status && error.status == 429 ) {
            let model = {
                code: 429,
                message: 'You\'ve been temporarily blocked from logging in PerfectLancer.'
            };
        }
        return observable.error({
            code: error.status,
            body: error.error
        });
    }

}
