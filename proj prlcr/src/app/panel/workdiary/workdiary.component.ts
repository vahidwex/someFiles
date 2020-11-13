import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { AlertService } from '../../tools/alert.service';
import { UploadService } from '../../Services/upload.service';
import { ApiService } from '../../Services/Api.Service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-workdiary',
    templateUrl: './workdiary.component.html',
    styleUrls: ['./workdiary.component.css']
})

export class WorkdiaryComponent implements OnInit {

    @ViewChild('file', {static: false}) file;

    public milestoneSelected = true;
    public messageSelected = false;
    public paymentSelect = false;
    public milestones: any = [{}];
    public selectedMilestone: any = {};
    public files: Set<File> = new Set();
    public progress;
    public addMode = false;
    public canBeClosed = true;
    public filename = '';
    public primaryButtonText = 'Upload';
    public uploadedFile = false;
    public showCancelButton = true;
    public uploading = false;
    public project_id: any = 0;
    public uploadSuccessful = false;
    public httpParams: HttpParams;
    public fileUrls: any = '';
    public file_description = '';
    public milestoneActive = true;
    public milestonesMSG: any = null;

    constructor(private router: Router,
                public dialog: MatDialog,
                private service: ApiService,
                private route: ActivatedRoute,
                private alertService: AlertService,
                public uploadService: UploadService) {
        this.httpParams = new HttpParams();
    }


    onFilesAdded() {
        const files: { [key: string]: File } = this.file.nativeElement.files;
        this.files.clear();
        this.files.add(files[0]);
        this.uploadFiles();
    }

    removeFile() {
        this.files.clear();
        this.uploadedFile = false;
    }

    milestoneSelect(milestone) {
        this.selectedMilestone = milestone;
        this.files.clear();
        this.uploadedFile = false;
        this.file_description = '';
        this.getMilestoneMSG();
    }

    addFiles() {
        this.file.nativeElement.click();
    }

    newWindowOpen(e) {
        window.open(e);
    }

    chat() {
        this.router.navigateByUrl('/panel/message?project_id=' + this.project_id);
    }

    scrollTop() {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);
    }

    openDialog(event: Event, status): void {
        event.preventDefault();
        event.stopPropagation();
        const dialogRef = this.dialog.open(AddMilestoneDialog, {
            width: '728px',
            data: [this.selectedMilestone, status]
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result == 'success') {
                this.milestones[this.milestones.lastIndexOf(this.selectedMilestone)].status = status;
            }
        });
    }

    updateMilestone(status) {
        var change = {
            "employer_message": this.selectedMilestone.freelancer_message,
            "status": status
        };
        this.service
            .patchMilestone(change, this.selectedMilestone.milestone_id)
            .subscribe(
                res => {
                    if (res) {
                        this.alertService.alertSuccess('Successfully changed status!');
                        this.milestones[this.milestones.lastIndexOf(this.selectedMilestone)].status = status;
                    }
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }

    completeMilestone() {
        //console.log(this.selectedMilestone);
        if (this.selectedMilestone.files == null) {
            this.alertService.alertError('Add a file first then you can mark as complete');
            return;
        }
        if (this.selectedMilestone.files.size == 0) {
            this.alertService.alertError('Add a file first then you can mark as complete');
            return;
        }

        this.selectedMilestone.status = 'completed';
        var change = {
            "status": this.selectedMilestone.status
        };
        this.service
            .patchMilestone(change, this.selectedMilestone.milestone_id)
            .subscribe(
                res => {
                    if (res) {
                        this.alertService.alertSuccess('status updated and we will notify employer to check your result');
                    }
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }

    uploadFiles() {
        if (this.uploadSuccessful) {
            //close
        }

        this.uploading = true;

        this.progress = this.uploadService.upload(this.files);

        for (const key in this.progress) {
            this.progress[key].progress.subscribe(val => {//console.log(val); this.filename = key;
            });
        }
        for (const key in this.progress) {
            this.progress[key].body.subscribe(val => {
                this.fileUrls = val;
                this.uploadedFile = true;
            });
        }

        let allProgressObservables = [];
        for (let key in this.progress) {
            allProgressObservables.push(this.progress[key].progress);
        }

        this.primaryButtonText = 'Finish';

        this.canBeClosed = false;

        this.showCancelButton = false;

        forkJoin(allProgressObservables).subscribe(end => {
            //console.log(this.fileUrls);
            this.canBeClosed = true;
            this.uploadSuccessful = true;
            this.uploading = false;
        });
    }

    getMilestoneMSG() {
        if (this.selectedMilestone) {
            this.service
                .milestoneMsg(this.selectedMilestone.milestone_id)
                .subscribe(
                    res => {
                        if (res) {
                            this.milestonesMSG = res;
                            //console.log(res);
                        }
                    },
                    err => {
                        this.alertService.alertError('Internal Server Error');
                    }
                );
        }
    }

    ngOnInit() {
        let queryParam = this.route.snapshot.queryParamMap;
        this.project_id = queryParam.get('project_id') ? queryParam.get('project_id') : 0;
        this.route.paramMap.subscribe(param => {
            if (param.get('project_id')) {
                this.project_id = param.get('project_id');
            } else {
                this.router.navigateByUrl('/panel/my-project');
            }
        });
        this.service
            .getMilestone(this.project_id)
            .subscribe(
                res => {
                    if (res.length != 0) {
                        this.milestones = res;
                        this.selectedMilestone = this.milestones[0];
                        this.getMilestoneMSG();
                        window.scrollTo(0, 0);
                        if (this.selectedMilestone && this.selectedMilestone.length == 0) {
                            this.router.navigate(['/panel/my-project']);
                        }
                        if (res.length == 0) {
                            this.router.navigate(['/panel/my-project']);
                        }
                    }
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('cannot get milestones please try again.');
                }
            );
    }

}


@Component({
    selector: 'add-milestone',
    templateUrl: 'add-milestone.html',
    styleUrls: ['add-milestone.css']
})

export class AddMilestoneDialog implements OnInit {
    constructor(private service: ApiService,
                private alertService: AlertService,
                private formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<AddMilestoneDialog>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    public bidMilestoneCount = [];
    public lastIndex = 0;
    public bidAmount: string = ''
    public bidDuration: string = ''
    public bidDesc: string = ''
    public milestones = [{
        description: '',
        amount: null,
        duration: null
    }]
    public bidForm: FormGroup

    ngOnInit(): void {
        this.bidForm = this.formBuilder.group({
            bidAmount: ['', Validators.required],
            bidDuration: ['', [Validators.required, Validators.minLength(50)]],
            bidDesc: ['', [Validators.required, Validators.minLength(50)]],
            milestoneDesc: ['', Validators.required],
            milestoneDuration: ['', Validators.required],
            milestoneAmount: ['', Validators.required],
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    numbericInputBidAmount(e) {
        this.bidAmount = this.bidAmount.replace(/[^0-9]/g, '');
        e.target.value = this.bidAmount
    }

    numbericInputBidDuration(e) {
        this.bidDuration = this.bidDuration.replace(/[^0-9]/g, '');
        e.target.value = this.bidDuration
    }

    numbericInputAmount(e, input) {
        this.milestones[this.milestones.lastIndexOf(input)].amount = this.milestones[this.milestones.lastIndexOf(input)].amount.replace(/[^0-9]/g, '');
        e.target.value = this.milestones[this.milestones.lastIndexOf(input)].amount
    }

    numbericInputDuration(e, input) {
        this.milestones[this.milestones.lastIndexOf(input)].duration = this.milestones[this.milestones.lastIndexOf(input)].duration.replace(/[^0-9]/g, '');
        e.target.value = this.milestones[this.milestones.lastIndexOf(input)].duration
    }

    addMilestone() {
        this.milestones.push({
            description: '',
            amount: null,
            duration: null
        })
    }

    removeMilestone(milestone: any) {
        let index = this.milestones.indexOf(milestone)
        this.milestones.splice(index, 1)
    }

    submitBid(project: any) {
        let bidPayload: any = {
            budget: this.bidAmount,
            project_id: project.project_id,
            bid_duration: this.bidDuration,
            description: this.bidDesc,
            status: 'created'
        }
        let bidMilestones: any[] = []
        let priceSum: number = 0
        let durationSum: number = 0
        for (let i = 0; i < this.milestones.length; i++) {
            let milestone = this.milestones[i]
            bidMilestones.push({
                description: milestone.description,
                duration: milestone.duration,
                budget: milestone.amount,
                project_id: project.project_id,
                status: 'created',
                bid_id: 0
            })
            priceSum = priceSum + parseInt(milestone.amount)
            durationSum = durationSum + parseInt(milestone.duration)
        }
        if (priceSum < parseInt(bidPayload.budget) && durationSum <= parseInt(bidPayload.bid_duration)) {
            let remainDuration = parseInt(bidPayload.bid_duration) - durationSum
            let remainAmount = parseInt(bidPayload.budget) - priceSum
            bidMilestones.push({
                description: 'complete project',
                duration: remainDuration.toString(),
                budget: remainAmount.toString(),
                project_id: project.project_id,
                status: 'created',
                bid_id: 0
            })
        } else {
            this.alertService.alertError('bid amount/duration must bigger than milestone\'s bid/duration sum')
            return;
        }


        this.service.bidOnProject(bidPayload).subscribe(
            res => {
                if (res) {
                    for (let milestone of bidMilestones) {
                        milestone.bid_id = res[0].bid_id
                    }
                    this.service.milestonesOnProject(bidMilestones).subscribe(
                        res => {
                            if (res) {
                                this.alertService.alertSuccess('your bid succesfully sent.');
                                this.dialogRef.close()
                            }
                        },
                        err => {
                            //console.log("milestone err:",err)
                            this.alertService.alertError('Fix your errors and try again');
                        }
                    )
                }
            },
            err => {
                //console.log("bid err:",err)
                this.alertService.alertError(err.error);
            }
        );
    }

    public status_description = "";

    changeStatus(data) {
        if (this.status_description.length < 5) {
            this.alertService.alertError('Description must be atleast 5 characters');
            return;
        }
        var change = {
            "employer_message": this.status_description,
            "status": data[1],
            "files": this.data[0].files
        };
        this.service
            .patchMilestone(change, data[0].milestone_id)
            .subscribe(
                res => {
                    if (res) {
                        this.alertService.alertSuccess('Successfully changed status!');
                        this.dialogRef.close('success');
                    }
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }


    get form() {
        return this.bidForm.controls
    }

}

