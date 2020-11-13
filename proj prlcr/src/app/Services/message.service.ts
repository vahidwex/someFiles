import { Injectable, Injector } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { BaseService } from "./base.service";


@Injectable()

export class MessageService extends BaseService {

    private subject = new Subject<any>();

    constructor(injector: Injector) {
        super(injector);
    }

    //////////////////////// Methods
    /**
     * This method will pass the message to observable.
     * @param key
     * @param message
     */
    public send(key:string, message: any) {
        this.subject.next({
            key: key,
            value: message,
        });
    }

    /**
     * This method will return observable to user.
     * @returns {Observable<any>}
     */
    public get(): Observable<any> {
        return this.subject.asObservable();
    }

    /**
     * This method will clear observable.
     */
    public clear() {
        this.subject.next();
    }
}
