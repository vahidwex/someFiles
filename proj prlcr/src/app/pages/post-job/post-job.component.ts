import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from '@angular/forms';
import { isPlatformBrowser } from "@angular/common";
import { forkJoin } from 'rxjs';

import { UploadService } from '../../Services/upload.service';
import { BlockUiService } from "../../tools/blockui-service";
import { AlertService } from "../../tools/alert.service";
import { MetaService } from "../../tools/meta.service"
import { AuthService } from "../../tools/auth-service";
import { ApiService } from "../../Services/Api.Service";
import { StaticData } from "../../Services/static-data";

@Component({
    selector: 'app-post-job',
    styleUrls: ['./post-job.component.css'],
    templateUrl: './post-job.component.html'
})

export class PostJobComponent {

    @ViewChild('file', { static: false }) file;
    @ViewChild('topHeader', { static: true }) topHeader : ElementRef;

    public paymentOptions = StaticData.PAYMENT_RANGES;
    public postState = 0;
    public payment_method = '$10 - $30';
    public projectModel = {
        project_category_id: 1,
        title: '',
        project_description: '',
        payment_type: 'fixed_priced',
        min_budget: '5',
        max_budget: '30',
        project_skills: [],
        project_all_skills: '',
        files: [],
    };
    public projectErrorModel = {
        project_category_id: '',
        title: '',
        project_description: '',
        payment_type: '',
        min_budget: '',
        max_budget: '',
        project_skills: '',
        project_all_skills: '',
        files: '',
    };
    public files: Set<File> = new Set();
    public progress : any = '';
    public progresses = [];
    public uploadComplete = [];
    public canBeClosed = true;
    public suggestions = [];
    public primaryButtonText = 'Upload';
    public showCancelButton = true;
    public uploading = false;
    public uploadSuccessful = false;
    public fileUrls  = [];
    public newsampledescription = '';
    public newsampletitle = '';
    public newfile : any = '';
    public submitted = false;
    public description = '';
    public skills :any = [];
    public disable = false;
    public progressValue = [];
    public options: string[] = [];
    public errorMessages = {
        'endsWith$': 'Skill cant be less than 3 characters',
        'maxSkills': 'Cant add more than 20 skills'
    };
    public suggestedSkills:any;
    public editproject:any = null;
    public projects:any = null;

    constructor(private authService: AuthService,
                private route: ActivatedRoute,
                private router: Router,
                private service: ApiService,
                public uploadService: UploadService,
                private alertService: AlertService,
                private metaService: MetaService,
                private blockUiService: BlockUiService,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    /**
     * ngOnInit()
     */
    public ngOnInit() {
        this.blockUiService.unBlockPage();
        this.metaService.setTitle('Post a Project | Find Expert Freelancers & Hire Them');
        this.metaService.setDescription('Post a project online and allow freelancers to bid on your project. Then, only select among the bidders those whom you find most procient at the task you are hiring for.');
        if ( isPlatformBrowser(this.platformId) ) {
            let queryParam = this.route.snapshot.queryParamMap;
            this.suggestedSkills = queryParam.get('skills') ? queryParam.get('skills') : '';
            if ( this.suggestedSkills != '' ) {
                this.autoCompleteItemsCategory();
            }
            this.route.paramMap.subscribe(param => {
                if (param.get('project_id')) {
                    this.editproject = param.get('project_id');
                    this.loadProjects();
                }
            });
            this.postProjectLikeThis();
        }
    }

    private loadProjects() {
        this.service
            .getProjectsById(this.editproject)
            .subscribe(
            res => {
                if ( res && res.length > 0 ) {
                    this.projectModel = {
                        project_category_id: 1,
                        title: '',
                        project_description: '',
                        payment_type: 'fixed_priced',
                        min_budget: '5',
                        max_budget: '30',
                        project_skills: [],
                        project_all_skills: '',
                        files: [],
                    };
                    this.projectModel.title = res[0].title;
                    this.projectModel.project_description = res[0].project_description;
                    this.projectModel.project_skills = res[0].project_skills;
                    this.projectModel.files = res[0].files;
                    this.projectModel.min_budget = res[0].min_budget;
                    this.projectModel.max_budget = res[0].max_budget;
                    this.payment_method = '$' + res[0].min_budget + ' - ' + res[0].max_budget;
                    this.projects = res;
                } else {
                    this.router.navigateByUrl('/404',{skipLocationChange: true});
                }
            },
            error => {
                console.error(error);
                this.router.navigateByUrl('/404',{skipLocationChange: true});
            }
        );
    }

    /**
     * ngAfterViewInit()
     */
    public ngAfterViewInit() {
        if ( this.topHeader && this.topHeader.nativeElement ) {
            this.topHeader.nativeElement.scrollIntoView({block: 'end'});
        }
    }

    /**
     *
     * @param min
     * @param max
     * @param name
     */
    public setPayment(min, max, name) {
        this.projectModel.min_budget = min;
        this.projectModel.max_budget = max;
        this.payment_method = name;
    }

    /**
     *
     */
    public nextStep() {
        var myfiles = [];
        var counter = 0;
        var stillUploading = false;
        this.files.forEach(element => {
            if ( this.uploadComplete[element.name] != 'done' ) {
                this.alertService.alertError('Still uploading your files');
                stillUploading = true;
                return;
            }
            myfiles.push({"filename":element.name,"urlPath":this.fileUrls[counter++].urlPath});
        });
        if ( stillUploading ) {
            return;
        }
        var skillmerge = '';
        this.projectModel.project_skills.forEach(element => {
            if(skillmerge.length == 0){
                skillmerge = element.value.replace(/[^a-zA-Z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
            }else{
                skillmerge = skillmerge + ',' + element.value.replace(/[^a-zA-Z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
            }
        });
        this.projectModel.files = myfiles;
        this.projectModel.project_all_skills = skillmerge;
        if ( this.validateForm() && !this.projects ) {
            this.service
                .sendProject(this.projectModel)
                .subscribe(
                res => {
                    this.alertService.alertSuccess("Posted");
                    // this.postStep = 1;
                    this.router.navigateByUrl('/panel/my-project');
                },
                err => {
                    if ( err.body.error.message == "Unauthenticated." ) {
                        this.alertService.alertSuccess("Project posted sign up to see your project");
                        this.authService.setProject(this.projectModel);
                        this.router.navigateByUrl('/register');
                        return;
                    }
                    this.alertService.alertError("Fix your errors");
                    this.submitted = true;
                }
            );
        }else if ( this.validateForm() && this.projects ) {
            this.service
                .updateProject(this.projectModel,this.editproject)
                .subscribe(
                res => {
                    this.alertService.alertSuccess("Editted");
                    this.router.navigateByUrl('/panel/my-project');
                },
                err => {
                    if ( err.body.error.message == "Unauthenticated." ) {
                        this.alertService.alertSuccess("Project posted sign up to see your project");
                        this.authService.setProject(this.projectModel);
                        this.router.navigateByUrl('/register');
                        return;
                    }
                    this.alertService.alertError("Fix your errors");
                    this.submitted = true;
                }
            );
        }

    }

    /**
     * @returns {boolean}
     */
    public validateForm() {
        this.projectErrorModel = {
            project_category_id: '',
            title: '',
            project_description: '',
            payment_type: '',
            min_budget: '',
            max_budget: '',
            project_skills: '',
            project_all_skills: '',
            files: '',
        };
        let valid = true;
        if ( this.projectModel.title == null || this.projectModel.title.length < 10 ) {
            this.projectErrorModel.title = 'Project name must be at least 10 character';
            valid = false;
        }
        if ( this.projectModel.title && this.projectModel.title.length >= 100 ) {
            this.projectErrorModel.title = 'Project name cannot be greater than 100 characters.';
            valid = false;
        }
        if ( this.projectModel.project_description == null || this.projectModel.project_description.length < 20 ) {
            this.projectErrorModel.project_description = 'Project description must be at least 20 character.';
            valid = false;
        }
        if ( this.projectModel.project_description && this.projectModel.project_description.length > 1000 ) {
            this.projectErrorModel.project_description = 'Project description cannot be greater than 1000 characters.';
            valid = false;
        }
        if ( this.projectModel.project_skills.length < 2 ) {
            this.projectErrorModel.project_skills = 'At least 2 skill needed to post this job.';
            valid = false;
        }
        return valid;
    }

    /**
     *
     */
    public onFilesAdded() {
        const files: { [key: string]: File } = this.file.nativeElement.files;
        const maxAllowedSize = 25 * 1024 * 1024;
        if ( this.files.size == 0 ) {
            this.files.add(files[0]);
            this.newfile = files[0];
            if(files[0].size > maxAllowedSize){
                this.files.clear();
                this.alertService.alertError('Cant add more than 25Mb file');
            }else{
                this.uploadFiles();
            }
        } else {
            if ( this.files.entries.length == 2 ) {
                this.disable = true;
                return;
            }
            var added = false;
            this.files.forEach(element => {
                if ( files[0].name == element.name && !added ) {
                    this.alertService.alertError('Cant add one file two times.');
                } else {
                    if(files[0].size > maxAllowedSize){
                        this.alertService.alertError('Cant add more than 25Mb file');
                      }else{
                        this.files.add(files[0]);
                        this.newfile = files[0];
                        added = true;
                        this.uploadFiles();
                      }
                }
            });
        }
    }

    /**
     *
     */
    public uploadFiles() {
        this.uploading = true;
        const myfiles: Set<File> = new Set();
        myfiles.add(this.newfile);
        myfiles.forEach(file => {
            this.progresses[file.name] = this.uploadService.upload(myfiles);
        });
        for ( const key in this.progresses[this.newfile.name] ) {
            this.progresses[this.newfile.name][key].progress.subscribe(val => {this.progressValue[this.newfile.name] = val; //console.log(val);
            });
        }
        for ( const key in this.progresses[this.newfile.name] ) {
            this.progresses[this.newfile.name][key].body.subscribe(val => {this.fileUrls.push(val); this.uploadComplete[this.newfile.name]= 'done'});
        }
        let allProgressObservables = [];
        for ( let key in this.progresses[this.newfile.name] ) {
            allProgressObservables.push(this.progresses[this.newfile.name][key].progress);
        }
        this.primaryButtonText = 'Finish';
        this.canBeClosed = false;
        this.showCancelButton = false;
        forkJoin(allProgressObservables).subscribe(end => {
            this.canBeClosed = true;
            this.uploadSuccessful = true;
            this.uploading = false;
        });
    }

    /**
     *
     */
    public addFiles() {
      if ( this.files.size == 2 ) {
        this.disable = true;
        this.alertService.alertError('Cant add more than two files.');
        return;
      } else {
        this.disable = false;
      }
      this.file.nativeElement.click();
    }

    /**
     *
     * @param file
     */
    public removeFiles(file) {
        this.files.delete(file);
        this.uploadComplete[file.name]= 'fail';
    }

    /**
     *
     */
    public autoCompleteItemsCategory() {
        this.suggestions = [];
        var autocompletebody = {
            "query": {
                "query_string": {
                    "query": this.suggestedSkills
                }
            },
            "size": 1
        };
        this.service
            .AutoCompleteSkill(autocompletebody)
            .subscribe(
          res => {
            let queryParam = this.route.snapshot.queryParamMap;
            if(res.hits.hits[0]._source.length != 0){
                // console.log(this.skills);
              for (var prop in res.hits.hits[0]._source) {
                if(this.suggestions.length == 0){
                  this.suggestions[0] = res.hits.hits[0]._source[prop];
                }else {
                  this.suggestions.push(res.hits.hits[0]._source[prop]);
                }
                if(this.skills.length == 0){
                    this.skills[0] = {'value':res.hits.hits[0]._source[prop],'display':res.hits.hits[0]._source[prop]};
                    this.projectModel.project_skills[0] = {display: res.hits.hits[0]._source[prop],value: res.hits.hits[0]._source[prop]};
                }else{
                    this.projectModel.project_skills.push({display: res.hits.hits[0]._source[prop],value: res.hits.hits[0]._source[prop]});
                    //this.skills.push({'value':res.hits.hits[0]._source[prop],'display':res.hits.hits[0]._source[prop]});
                }
                // console.log(this.skills );
              }
              this.projectModel.title = queryParam.get('title') ? queryParam.get('title') : '';
              this.alertService.alertSuccess('Added skills and title based on selected category');
            }else{
              this.suggestions = [];
            }
          },
          err => {
              this.suggestions = [];
          }
        );
    }

    /**
     *
     */
    public autoCompleteItems() {
      // skills_suggestion
      this.suggestions = [];
      var autocompletebody = {
          "query": {
              "query_string": {
                  "query": this.projectModel.project_description + " " + this.projectModel.title
              }
          },
          "size": 1
      };
      this.service
          .AutoCompleteSkill(autocompletebody)
          .subscribe(
              res => {
                  if ( res.hits && res.hits.hits && res.hits.hits.length > 0 && res.hits.hits[0]._source.length != 0 ) {
                      for ( var prop in res.hits.hits[0]._source ) {
                          if ( this.suggestions.length == 0 ) {
                              this.suggestions[0] = res.hits.hits[0]._source[prop];
                          } else {
                              this.suggestions.push(res.hits.hits[0]._source[prop]);
                          }
                      }
                  } else {
                      this.suggestions = [];
                  }
              },
              err => {
                  this.suggestions = [];
              });
    }

    /**
     *
     */
    public postProjectLikeThis() {
        if ( this.authService.getProjectLikeThis() ) {
            let project = this.authService.getProjectLikeThis();
            this.projectModel.title = project.title;
            this.projectModel.project_description = project.project_description;
            this.projectModel.project_skills = project.project_skills;
            this.authService.deleteProjectLikeThis();
        }
    }

    /**
     * @param skill
     */
    public addSuggested(skill) {
        let matched = 0;
        this.projectModel.project_skills.forEach(function(element) {
            if ( element.value == skill ) {
                matched = 1;
            }
        });
        if ( matched == 0 ) {
            this.projectModel.project_skills.push({display: skill,value: skill});
        }
    }

    /**
     *
     * @param {FormControl} control
     * @returns {any}
     */
    public endsWith$(control: FormControl) {
        if ( control.value.length < 3 ) {
            return {
                'endsWith$': true
            };
        }
        return null;
    }

}
