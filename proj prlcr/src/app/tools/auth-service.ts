import {Injectable} from '@angular/core';

@Injectable()

export class AuthService {

    constructor() {
    }

    public isUser() {
        let user = this.getUser();
        return !!user;
    }

    /**
     * This method will set user data to local storage.
     *
     * @param data
     * @param createModel
     */
    public setUser(data, createModel = true) {
        if (createModel) {
            let userData = new UserModel(data);
            localStorage.setItem('user.data', JSON.stringify(userData));
        } else {
            localStorage.setItem('user.data', JSON.stringify(data));
        }
    }

    public setProject(data, createModel = true) {
        localStorage.setItem('user.project', JSON.stringify(data));
    }

    public getProject() {
        return JSON.parse(localStorage.getItem('user.project'));
    }

    public deleteProject() {
        localStorage.removeItem('user.project');
    }

    public setProjectLikeThis(data) {
        localStorage.setItem('project.like', JSON.stringify(data));
    }

    public getProjectLikeThis() {
        return JSON.parse(localStorage.getItem('project.like'));
    }

    public deleteProjectLikeThis() {
        localStorage.removeItem('project.like');
    }

    /**
     * Returns if user has verified card.
     *
     * @returns {boolean}
     */
    public isCardVerified() {
        return this.getUser().payment_status;
    }

    /**
     * Make user payment status true.
     */
    public verifyCard() {
        let user = this.getUser();
        user['payment_status'] = true;
        this.setUser(user, false);
    }

    /**
     * This method will fire to return user data from local storage.
     * @returns {any}
     */
    public getUser() {
        return JSON.parse(localStorage.getItem('user.data'));
    }

    /**
     * This method will return user id.
     *
     * @returns {any}
     */
    public getUserId() {
        return JSON.parse(localStorage.getItem('user.data')).user_id;
    }

    /**
     * This method will return user avatar.
     *
     * @returns {string | any}
     */
    public getUserAvatar() {
        return this.getUser().avatar;
    }

    /**
     * This method will update user avatar.
     * @param data
     */
    public updateAvatar(data) {
        let temp = this.getUser();
        temp['avatar'] = data;
        this.setUser(temp, false);
    }

    /**
     * This method will return user type.
     *
     * @returns {string}
     */
    public getUserType() {
        let user = this.getUser();
        return user ? user.userType : null;
    }

    /**
     * This method will fire to remove user data from storage.
     */
    public deleteUser() {
        localStorage.removeItem('user.data');
    }
}

/**
 * This class will present user model.
 */
class UserModel {

    public auth_id: number = 0;
    public user_id: number = 0;
    public first_name: string = '';
    public last_name: string = '';
    public phones: any[] = [];
    public social_acount: any = '';
    public country: any = '';
    public userType: string = '';
    public state: any = '';
    public education: any = '';
    public workexprience: any = '';
    public skills: any = '';
    public workhour: any = 0;
    public role: string = '';
    public emails: any[] = [];
    public avatar: string = '';
    public rate: string = 'N/A';
    public locked: boolean = false;
    public blocked: boolean = false;
    public phone: string = '';
    public description: string = '';
    public worksample: any = '';
    public payment_status: boolean = false;


    constructor(data) {
        this.auth_id = data.auth.id ? data.auth.id : 0;
        if (data.auth.identifiers) {
            this.setUserIdentifiers(data.auth.identifiers);
        }
        if (data.profile == undefined) {
            return;
        }
        this.blocked = !!(data.auth.blocked);
        this.locked = !!(data.auth.locked);
        this.avatar = data.auth.avatar_url ? data.auth.avatar_url : '../../../assets/images/default-' + data.profile.user_id%12 + '.png';
        this.user_id = data.profile.user_id;
        this.first_name = data.profile.first_name;
        this.last_name = data.profile.last_name;
        this.phone = data.profile.phone;
        this.social_acount = data.profile.social_acount;
        this.country = data.profile.country;
        this.state = data.profile.state;
        this.education = data.profile.education;
        this.skills = data.profile.skills;
        this.workexprience = data.profile.workexprience;
        this.rate = data.profile.rate ? data.profile.rate : 'N/A';
        this.role = data.profile.role;
        this.userType = data.profile.role;
        this.description = data.profile.description;
        this.worksample = data.profile.worksample;
        this.payment_status = !!data.profile.payment_status;
    }

    /**
     * this method will fire to set identifiers and their verified status.
     *
     * @param identifiers
     */
    private setUserIdentifiers(identifiers = []) {
        if (identifiers.length > 0) {
            for (let item of identifiers) {
                if (item.type == 'email') {
                    this.emails.push(item);
                } else if (item.type == 'mobile') {
                    this.phones.push(item);
                }
            }
        }
    }
}
