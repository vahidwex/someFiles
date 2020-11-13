import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertService } from '../../tools/alert.service';
import { UploadService } from '../../Services/upload.service';
import { ApiService } from '../../Services/Api.Service';

@Component({
    selector: 'app-milestones',
    templateUrl: './milestones.component.html',
    styleUrls: ['./milestones.component.css']
})

export class MilestonesComponent implements OnInit {

    @ViewChild('file', {static: false}) file;

    public milestoneSelected = true;
    public messageSelected = false;
    public paymentSelect = false;
    public milestones: any = [{}];
    public selectedMilestone: any = {};
    public files: Set<File> = new Set();
    public progress;
    public canBeClosed = true;
    public filename = '';
    public primaryButtonText = 'Upload';
    public uploadedFile = false;
    public showCancelButton = true;
    public uploading = false;
    public project_id: any = 0;
    public uploadSuccessful = false;
    public fileUrls: any = '';
    public file_description = "";
    public milestonesMSG: any = null;

    constructor(private router: Router,
                private service: ApiService,
                private route: ActivatedRoute,
                private alertService: AlertService,
                public uploadService: UploadService) {}

    ngOnInit() {
        let queryParam = this.route.snapshot.queryParamMap;
        this.project_id = queryParam.get('project_id') ? queryParam.get('project_id') : 0;
        this.route.paramMap.subscribe(param => {
            if (param.get('project_id')) {
                this.project_id = param.get('project_id');
            } else {
                this.router.navigateByUrl('/panel/bids');
            }
        });

        this.service
            .getMilestone(this.project_id)
            .subscribe(
                res => {
                    if (res) {
                        this.milestones = res;
                        this.selectedMilestone = this.milestones[0];
                        this.getMilestoneMSG();
                        window.scrollTo(0, 0);
                        if (res.length == 0) {
                            this.router.navigateByUrl('/panel/bids');
                        }
                    }
                },
                err => {
                    this.router.navigateByUrl('/panel/bids');
                    this.alertService.alertError('Internal Server Error');
                }
            );

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
        this.getMilestoneMSG();
        this.files.clear();
        this.uploadedFile = false;
        this.file_description = '';
    }

    addFiles() {
        this.file.nativeElement.click();
    }

    newWindowOpen(e) {
        window.open(e);
    }

    chat() {
        this.router.navigateByUrl('/panel/message?project_id=' + this.selectedMilestone.project_id);
    }

    updateMilestone() {
        if (!this.uploadedFile) {
            this.alertService.alertError('You need atleast one file uploaded.');
            return;
        }
        //console.log(this.file_description);
        this.selectedMilestone.files = [{
            "filename": this.filename,
            "urlPath": this.fileUrls.urlPath
        }];
        this.selectedMilestone.freelancer_message = this.file_description;
        var change = {
            "status": this.selectedMilestone.status,
            "freelancer_message": this.selectedMilestone.freelancer_message,
            "files": this.selectedMilestone.files
        };
        this.service
            .patchMilestone(change, this.selectedMilestone.milestone_id)
            .subscribe(
                res => {
                    if (res) {
                        this.alertService.alertSuccess('Your file and description are saved');
                    }
                },
                err => {
                    console.error(err);
                    this.alertService.alertError('Internal Server Error');
                }
            );
    }

    completeMilestone() {
        var count = 0;
        if (this.selectedMilestone.milestone_description == 'complete project') {
            this.milestones.forEach(element => {
                if (element.status == 'checkout' || element.status == 'accepted') {
                    count++;
                }
            });
            if (count != this.milestones.length - 1) {
                this.alertService.alertError('Your milestones should be accepted or checkout to complete project');
                return;
            } else {
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
                                return;
                            }
                        },
                        err => {
                            console.error(err);
                            this.alertService.alertError('Internal Server Error');
                            return;
                        }
                    );
            }
        }
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
