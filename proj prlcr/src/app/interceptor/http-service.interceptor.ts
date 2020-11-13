import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { TokenService } from '../Services/token.service';

import { Api } from '../Services/Api';
import { EMPTY } from 'rxjs';

const STATE_KEY_PREFIX = 'http_requests:';

@Injectable()
/**
 * This class present interceptor of http requests.
 */
export class HttpServiceInterceptor implements HttpInterceptor {

    constructor(private transferState: TransferState,
                private tokenService: TokenService,
                private router: Router,
                @Inject(PLATFORM_ID) private platformId: string) {
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        if ( isPlatformServer(this.platformId) && this.router.url.indexOf('panel') !== -1 ) {
            return EMPTY;
        }
        if ( token && (request.url.indexOf(Api.BASE_URL) !== -1 || request.url.indexOf(Api.BASE_BILLING_URL) !== -1 || request.url.indexOf(Api.BASE_URL_OAUTH) !== -1) ) {
            request = request.clone({   
                setHeaders: {
                    Authorization: token,
                }
            });
        }
        if ( request.url.indexOf(Api.BASE_URL) !== -1 ) {
            request = request.clone({
                setHeaders: {
                    'Accept': 'application/json',
                }
            });
        }

        if (request.method !== 'GET') {
            return next.handle(request);
        }

        const key = makeStateKey<HttpResponse<object>>(STATE_KEY_PREFIX + request.url.substr(0, request.url.indexOf('?')));

        if ( isPlatformBrowser(this.platformId) ) {
            // Try reusing transferred response from server
            const cachedResponse = this.transferState.get(key, null);
            if ( cachedResponse ) {
                this.transferState.remove(key); // cached response should be used for the very first time
                return of(new HttpResponse({
                    body: cachedResponse.body,
                    status: 200,
                    statusText: 'OK (from server)',
                }));
            }
            return next.handle(request);
        }

        if ( isPlatformServer(this.platformId) ) {
            // Try saving response to be transferred to browser
            return next.handle(request).pipe(tap(event => {
                if ( event instanceof HttpResponse && (event.status.toString()[0] == '2') ) {
                    const response = {
                        body: event.body
                    };
                    this.transferState.set(key, response);
                }
            }));
        }
    }

}
