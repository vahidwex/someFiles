import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()

/**
 * This class is an interface for `ngx-toastr`.
 */
export class AlertService {

    constructor(private toastr: ToastrService) {}

    /**
     * Pop toast alert type normal.
     *
     * @param alertMsg
     * @param {string} alertTitle
     */
    public alert(alertMsg, alertTitle = '') {
        let option: any = {
            closeButton: true,
            progressBar: true,
        };
        this.toastr.info(alertMsg, alertTitle, option);

    }

    /**
     * Pop toast alert type success.
     *
     * @param alertMsg
     * @param {string} alertTitle
     */
    public alertSuccess(alertMsg, alertTitle = '') {
        let option: any = {
            closeButton: true,
            progressBar: true,
        };
        this.toastr.success(alertMsg, alertTitle, option);
    }

    /**
     * Pop toast alert type error.
     *
     * @param alertMsg
     * @param {string} alertTitle
     */
    public alertError(alertMsg, alertTitle = '') {
        let option: any = {
            closeButton: true,
            progressBar: true,
        };
        this.toastr.error(alertMsg, alertTitle, option);
    }

    /**
     * Pop toast alert type warning.
     *
     * @param alertMsg
     * @param {string} alertTitle
     */
    public alertWarn(alertMsg, alertTitle = '') {
        let option: any = {
            closeButton: true,
            progressBar: true,
        };
        this.toastr.warning(alertMsg, alertTitle, option);
    }

    /**
     * Clear all toasts.
     */
    public clearAlerts() {
        this.toastr.clear();
    }

}
