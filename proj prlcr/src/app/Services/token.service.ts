import { Injectable, Injector } from '@angular/core';
import { ReplaySubject } from "rxjs/ReplaySubject";

import { BaseService } from "./base.service";

@Injectable()
export class TokenService extends BaseService {

	constructor (injector: Injector) {
		super(injector);
	}

    /**
	 * This method will store token model in local storage.
	 * $ TokenModel()
	 *
     * @param token
     */
	public setToken(token) {
		let tokenModel = new TokenModel(token);
		localStorage.setItem('auth-token', JSON.stringify(tokenModel));
	}

    /**
	 * This method will return usable token for API request.
	 * {{ Token Type }} + {{ Access Token }}
	 * !Important: If token is not valid, this method will return null.
	 *
     * @returns {any}
     */
	public getToken() {
		let tokenModel = this.getAllTokenModel();
		if ( tokenModel && tokenModel.is_token_valid ) {
			return ( tokenModel.token_type + ' ' + tokenModel.access_token );
        }
        return null;
	}

    /**
	 *
     */
	public getRefreshToken() {
        let tokenModel = this.getAndRemoveTokenModel();
        if ( tokenModel && tokenModel.is_token_valid ) {
            return ( tokenModel.refresh_token );
        }
        return null;
	}

    /**
	 * This method will return token model completely.
	 * $ TokenModel()
	 *
     * @returns {any}
     */
	public getAllTokenModel() {
		return JSON.parse(localStorage.getItem('auth-token'));
    }
    
    public getAndRemoveTokenModel(){
        let tmp = JSON.parse(localStorage.getItem('auth-token'));
        this.clearToken();
        return tmp;
    }

    /**
	 * This method clear storage from auth token.
     */
	public clearToken() {
        localStorage.removeItem('auth-token');
	}

    /**
	 * This method will get new token and save it.
	 *
     * @param identifier
     * @param password
     * @returns {ReplaySubject<any>}
     */
	public getNewToken(identifier, password): ReplaySubject<any>{
        let observable: ReplaySubject<any> = new ReplaySubject();
		let requestModel = {
            username: identifier,
            password: password,
        };
        //console.log(requestModel);
        this.httpPost(this.api.OAUTH_LOGIN, requestModel, {'Accept': 'application/json', 'Content-Type': 'application/json'})
            .subscribe(
                result => this.onTokenSuccess(result, observable),
                error => this.onTokenError(error, observable));
        return observable;
	}

    /**
	 * This method will call oauth server to get refresh token.
     */
	public callRefreshToken(): ReplaySubject<any> {
        let observable: ReplaySubject<any> = new ReplaySubject();
		let token = this.getAllTokenModel();
		// create request model
		let requestModel = {
            grant_type: 'refresh_token',
            refresh_token: token.refresh_token,
        	client_id: this.api.CLIENT_ID,
		};

		this.httpPost(this.api.OAUTH_LOGIN, requestModel, {})
			.subscribe(
				result => this.onTokenSuccess(result, observable),
				error => this.onTokenError(error, observable));
        return observable;
	}

    /**
	 * This method will request to change password.
	 *
     * @param requestModel
     * @returns {ReplaySubject<any>}
     */
	public changePassword(requestModel): ReplaySubject<any>  {
        let observable: ReplaySubject<any> = new ReplaySubject();

        this.httpPost(this.api.CHANGE_PASSWORD, requestModel, {})
            .subscribe(
                result => this.onChangePasswordSuccess(result, observable),
                error => this.onChangePasswordError(error, observable));
        return observable;
    }

    /**
	 * This method will log user out.
     */
	public logOutUser() {
        // Api call asd@rmailcloud.com
		let body = {
			token: this.getRefreshToken(),
        };
		this.httpPost(this.api.LOGOUT_USER, body, {})
			.subscribe(
				result => this.onLogoutSuccess(result),
				error => this.onLogoutError(error));
	}

    //////////////////////// Service Observers

    /**
     * This method will fire if oauth request succeeded.
     *
     * @param response
     * @param observable
     */
    private onTokenSuccess(response, observable) {
        if ( response.body ) {
			this.setToken(response.body);
        }
        this.handleSuccessResponse(response, observable);
	}

    /**
     * This method will fire if oauth request fails.
     *
     * @param error
     * @param observable
     */
    private onTokenError(error, observable) {
        this.authService.deleteUser();
        this.handleFailedResponse(error, observable);
	}

    /**
	 * This method will fire if logout successfully response.
     * @param response
     */
	private onLogoutSuccess(response) {
        this.clearToken();
        this.authService.deleteUser();
        this.blockUiService.unBlockPage();
        this.router.navigateByUrl('/');
	}

    /**
	 * This method will fire if log out api doesn't response.
     * @param error
     */
	private onLogoutError(error) {
    	this.clearToken();
        this.blockUiService.unBlockPage();
    	this.router.navigateByUrl('/');

	}

    /**
	 * This method will fire if user password changed successfully.
	 *
     * @param response
     * @param observable
     */
	private onChangePasswordSuccess(response, observable) {
        if (response.body || response.status == 204) {
            this.authService.deleteUser();
            this.router.navigateByUrl('/');
            return observable.next(response.body);
        }
        let tempModel = {Error: "Some error returned unreadable"};
        return observable.error(JSON.stringify(tempModel));
	}

    /**
	 * This method will fire if change password doesn't accepted.
	 *
     * @param error
     * @param observable
     */
	private onChangePasswordError(error, observable) {
        if ( error.status && error.status.toString().indexOf(0) === "5" ) {
            this.router.navigate(["/500"]);
        }
        return observable.error(error.error);
	}
}

/**
 * This class generate token model.
 */
class TokenModel {

	public token_type: string;
	public access_token: string;
	public refresh_token: string;
	public is_token_valid: boolean;

    constructor(data) {
    	this.token_type = data.token_type ? data.token_type : '';
    	this.access_token = data.access_token ? data.access_token : '';
    	this.refresh_token = data.refresh_token ? data.refresh_token : '';
        this.is_token_valid = ( data.access_token && data.access_token !== null );
	}
}
