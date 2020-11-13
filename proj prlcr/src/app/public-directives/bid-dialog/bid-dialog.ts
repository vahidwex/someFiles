import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from '../../Services/Api.Service';
import { AlertService } from '../../tools/alert.service';

@Component({
    styleUrls: ['./bid-dialog.css'],
    templateUrl: './bid-dialog.html'
})

export class BidDialog {

    public bidForm = {
        budget: "",
        bidDuration: "",
        bidDescription: "",
        milestones: [],
    };
    public bidError = {
        budget: "",
        bidDuration: "",
        bidDescription: "",
        milestones: "",
    };

    constructor(private service: ApiService,
                private alertService: AlertService,
                public dialogRef: MatDialogRef<BidDialog>,
                @Inject(MAT_DIALOG_DATA) public data: any) {}

    /**
     * ngOnInit()
     */
    public ngOnInit() {}

    /**
     * Add milestones
     */
    public addMilestone() {
        this.bidForm.milestones.push({
            duration: '',
            amount: '',
            description: ''
        });
    }

    /**
     * Remove a milestone by index
     * @param {number} index
     */
    public removeMilestone(index) {
        // console.log(index);
        // console.log(this.bidForm.milestones);
        this.bidForm.milestones.splice(index, 1);
    }

    /**
     *
     * @param e
     */
    public submitBid(e) {
        e.preventDefault();
        const payload = {
            description: this.bidForm.bidDescription,
            bid_duration: this.bidForm.bidDuration,
            budget: this.bidForm.budget,
            milestones: this.bidForm.milestones,
            project_id: this.data.project_id
        };
        if ( this.validateForm() ) {
            this.service
                .bidOnProject(payload)
                .subscribe(
                    res => {
                        if (res) {
                            this.alertService.alertSuccess('Your bid successfully sent.');
                            this.dialogRef.close();
                        }
                    },
                    error => {
                        let errorMsg = 'Somethings went wrong! please check your bid';
                        if ( error.body.error ) {
                            errorMsg = error.body.error;
                        }
                        this.alertService.alertError(errorMsg);
                    });
        }
    }

    /**
     *
     */
    private validateForm() {
        this.bidError = {
            budget: "",
            bidDuration: "",
            bidDescription: "",
            milestones: "",
        };
        let valid = true;
        let milestoneDurationCounter = 0
        let amountCounter = 0
        if ( this.bidForm.budget == null || this.bidForm.budget.length == 0 ) {
            this.bidError.budget = 'Amount is required';
            valid = false;
        }
        if(parseInt(this.bidForm.budget) < 10){
            this.bidError.budget = 'Amount must be greater than 10$';
            valid = false;
        }

        if ( this.bidForm.bidDuration == null || this.bidForm.bidDuration.length == 0 ) {
            this.bidError.bidDuration = 'Duration is required';
            valid = false;
        }
        if ( this.bidForm.bidDescription == null || this.bidForm.bidDescription.length < 50 || this.bidForm.bidDescription.length > 5000 ) {
            this.bidError.bidDescription = 'Description must be between 50 up to 5000 characters';
            valid = false;
        }
        for ( let item of this.bidForm.milestones ) {
            if ( item.description.length == 0 || item.duration.length == 0 || item.amount.length == 0 ) {
                this.bidError.milestones = 'All fields of milestones are required';
                valid = false;
                break;
            }
            if(isNaN(item.duration)||isNaN(item.amount)){
                this.bidError.milestones = 'Milestones amount and duration must be number';
                valid = false;
                break;
            }
            milestoneDurationCounter += parseInt(item.duration);
            amountCounter += parseInt(item.amount);
        }
        if(parseInt(this.bidForm.budget) < amountCounter){
            this.bidError.milestones = 'bid amount must be greater or equal milestones amount';
            valid = false;
        }
        if(parseInt(this.bidForm.bidDuration) < milestoneDurationCounter){
            this.bidError.milestones = 'bid duration must be greater or equal milestones duration';
            valid = false;
        }
        if(parseInt(this.bidForm.bidDuration) < milestoneDurationCounter && parseInt(this.bidForm.budget) < amountCounter){
            this.bidError.milestones = 'bid duration/amount must be greater or equal milestones duration/amount';
            valid = false;
        }
        return valid;
    }

}

interface milestone {
    description: string;
    duration: number;
    amount: number;
}
