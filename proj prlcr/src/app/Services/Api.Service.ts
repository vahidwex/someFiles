import { Injectable, Injector } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { BaseService } from "./base.service";

const HttpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()

/**
 * ApiService
 */
export class ApiService extends BaseService {

    constructor(injector: Injector) {
        super(injector);
    }

    public registerUser(requestModel) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.OAUTH_REGISTER, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public AutoCompleteSkill(requestModel) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.SKILL_SUGGEST, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public getBookmarks(){
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.BOOKMARKS, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public bookmark(requestModel){
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.BOOKMARKS, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public unbookmark(id){
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpDelete(this.api.BOOKMARKS + '?bookmark_project_id=' + id, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public getMyBidCount(){
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.BID_COUNT, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public verifyAccount(requestModel) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.VERIFY_ACCOUNT, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public sendProject(requestModel) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.SIMPLE_POST, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable));
        return observable;
    }

    public updateProject(requestModel,project_id) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPatch(this.api.SIMPLE_POST + '?project_id=' + project_id, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable));
        return observable;
    }

    public sendVerification(requestModel) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.SEND_ACCOUNT_VERIFICATION, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public updateProfile(requestModel) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPatch(this.api.USER_PROFILE, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public addIdentifierProfile(requestModel) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.ADD_IDENTIFIER, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public removeIdentifierProfile(requestModel) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.REMOVE_IDENTIFIER, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public changePasswordProfile(requestModel) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.CHANGE_PASSSWORD, requestModel, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public avatarProfile(requestModel) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.USER_AVATAR, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public deleteAvatarProfile() {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpDelete(this.api.USER_AVATAR, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public getPublicProfile(id) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.USER_PUBLIC + '/' + id, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public getSeoContent(title,field){
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.PUBLIC_SEOCONTENT + title + '/' + field, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public getUserDetails() {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.USER_PROFILE, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public getUserSkills() {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.SKILL, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public sendForgetPassword(requestModel) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.SEND_RESET_PASSWORD, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public sendResetPassword(requestModel) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.RESET_PASSWORD, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public postBids(requestModel) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.BIDS, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public getBids(projectId = null, status = null, limit, offset) {
        const observable: ReplaySubject<any> = new ReplaySubject();

        let queryModel = [];
        if (projectId) queryModel.push("projects_project_id=eq." + projectId);
        if (status && status != 'all') queryModel.push("status=" + status);
        let queryString = '';
        if (queryModel && queryModel.length > 0) {
            queryString = '?' + queryModel.join('&');
        }
        let requestBody = {
            limit: limit,
            offset: offset * limit,
        };
        this.httpPost(this.api.BIDS + '/page' + queryString, requestBody, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public getProjectBids(status = null, limitBids, offsetBids) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        const payLoadBids = {
            limit: limitBids,
            offset: (offsetBids * limitBids)
        };

        this.httpPost(this.api.BIDS + '/page' + status, payLoadBids, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public getWordpressPosts(num){
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.WORDPRESS_POST + '?per_page=' + num + '&_embed', HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public getGlobalList(list_name) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.GLOBAL_LISTS + '?global_list_name=eq.' + list_name, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public getMilestoneBid(bidId) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.MILSTONE + '?bid_id=' + bidId, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public milestoneMsg(milestoneId){
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.MILSTONE_MSG + '?milestone_id=' + milestoneId, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public getMilestone(projectId) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.MILSTONE + '?project_id=' + projectId, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public getOtherProjects(user_id) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.OTHER_PROJECTS + '?project_user_id=' + user_id, HttpOptions)
            .subscribe(
                result => this.handleSuccessResponse(result, observable),
                error => this.handleFailedResponse(error, observable),
            );
        return observable;
    }

    public getProjectsById(projectId) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.PROJECTS + '?project_id=eq.' + projectId, HttpOptions)
            .subscribe(
                result => this.handleSuccessResponse(result, observable),
                error => this.handleFailedResponse(error, observable),
            );
        return observable;
    }

    // public getFreelancersByTitle(title, minbudget, maxbudget, limit, offset, skillfilter, order, usonly) {
    //     const observable: ReplaySubject<any> = new ReplaySubject();
    //     this.httpGet(this.api.FREELANCERS + '?description=like.*' + title.toLowerCase() + '*' + '&limit=' + limit + '&offset=' + (offset * limit) + skillfilter.toLowerCase() + (order == 'default' ? '&order=user_id.desc' : '&order=user_id.asc') + (usonly ? '&country=eq.US' : ''), HttpOptions)
    //         .subscribe(
    //             result => this.HandleSuccessRequestsWithHeader(result, observable),
    //             error => this.handleFailedResponse(error, observable),
    //         );
    //     return observable;
    // }

    public getFreelancersByTitle(title, minbudget, maxbudget, limit, offset, skillfilter, order, usonly = null) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.FREELANCERS + '?description=like.*' + title.toLowerCase() + '*' + '&limit=' + limit + '&offset=' + (offset * limit) + skillfilter.toLowerCase() + (order == 'default' ? '&order=user_id.desc' : '&order=user_id.asc') + (usonly ? ('&country=eq.' + usonly) : ''), HttpOptions)
            .subscribe(
                result => this.HandleSuccessRequestsWithHeader(result, observable),
                error => this.handleFailedResponse(error, observable),
            );
        return observable;
    }

    public getProjectsByTitle(title, minbudget, maxbudget, limit, offset, skillfilter, order, usonly) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.PROJECTS + '?title=like.*' + title.toLowerCase() + '*' + '&min_budget=gte.' + minbudget + '&max_budget=lte.' + maxbudget + '&limit=' + limit + '&offset=' + (offset * limit) + skillfilter.toLowerCase() + (order == 'default' ? '&order=project_id.desc' : '&order=project_id.asc') + (usonly ? ('&country=eq.' + usonly) : ''), HttpOptions)
            .subscribe(
                result => this.HandleSuccessRequestsWithHeader(result, observable),
                error => this.handleFailedResponse(error, observable),
            );
        return observable;
    }

    public getProjectsByCountry(title, minbudget, maxbudget, limit, offset, skillfilter, order, usonly) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.PROJECTS + '?title=like.*' + title.toLowerCase() + '*' + '&min_budget=gte.' + minbudget + '&max_budget=lte.' + maxbudget + '&limit=' + limit + '&offset=' + (offset * limit) + skillfilter.toLowerCase() + (order == 'default' ? '&order=project_id.desc' : '&order=project_id.asc') + '&country=eq.'+usonly , HttpOptions)
            .subscribe(
                result => this.HandleSuccessRequestsWithHeader(result, observable),
                error => this.handleFailedResponse(error, observable),
            );
        return observable;
    }

    public getMyProjects(id) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.PROJECTS + '?auth_id=eq.' + id, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public getMyProjectsWithStatus(status) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        if (status == 'all') {
            this.httpGet(this.api.MY_PROJECTS, HttpOptions).subscribe(
                result => this.handleSuccessResponse(result, observable),
                error => this.handleFailedResponse(error, observable),
            );
        } else {
            this.httpGet(this.api.MY_PROJECTS + '?status=' + status, HttpOptions).subscribe(
                result => this.handleSuccessResponse(result, observable),
                error => this.handleFailedResponse(error, observable),
            );
        }
        return observable;
    }

    public patchBids(BidId, requestModel) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPatch(this.api.BIDS + '?bid_id=' + BidId, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public patchMilestone(requestModel, milestone_id) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPatch(this.api.MILSTONE + '?milestone_id=' + milestone_id, requestModel, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public deleteBids() {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpDelete(this.api.BIDS, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public bidOnProject(payload: any) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.BID_ON_PROJECT, payload, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public sendTokenNotif(payload: any) {
        //console.log('iubcuhebciubeiujveiurbveu', payload);
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.WEB_NOTIF, payload, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public addPayment(data) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.ADD_PAYMENT, data, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public addCard(data) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.ADD_CARD, data, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public milestonesOnProject(payload: any) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.MILESTONES_ON_PROJECT, payload, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public LIVECHAT_SEND(channel: any, payload: any) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.LIVECHAT_SEND + channel, payload, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public LIVECHAT_SESSION(payload: any) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpPost(this.api.LIVECHAT_SESSION, payload, {}).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public LIVECHAT_HISTORY(channel: any) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.LIVECHAT_HISTORY + channel, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public LIVECHAT_USER_SESSIONS(channel: any) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.LIVECHAT_USER_SESSIONS + channel, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    public LIVECHAT_SESSIONS_USER(channel: any) {
        const observable: ReplaySubject<any> = new ReplaySubject();
        this.httpGet(this.api.LIVECHAT_SESSIONS_USER + channel, HttpOptions).subscribe(
            result => this.handleSuccessResponse(result, observable),
            error => this.handleFailedResponse(error, observable),
        );
        return observable;
    }

    private HandleSuccessRequestsWithHeader(response, observable) {
        this.barService.complete();
        if ( response.body ) {
            observable.next([response.body, response.headers.get('content-range')]);
            return observable.complete();
        }
        if (response.status && response.status === 204 || response.status === 200 || response.status === 201) {
            observable.next({});
            return observable.complete();
        }
        const tempModel = {Error: 'Some error returned unreadable'};
        return observable.error(JSON.stringify(tempModel));
    }


}
