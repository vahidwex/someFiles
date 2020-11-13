import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {BlockUiService} from '../../tools/blockui-service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ApiService} from '../../Services/Api.Service';
import {AlertService} from '../../tools/alert.service';
import {MetaService} from '../../tools/meta.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AddCardComponent } from "../../public-directives/add-card/add-card.component";

export interface filter {
    id: string;
    name: string;
    items: any[];
}

export interface project {
    title: string;
    localOnly: string;
    description: string;
    createAt: string;
    skills: string[];
    rate: string;
    paymentVerify: boolean;
    numberOfProposals: string;
    totalSpent: string;
    projectType: string;
    budget: string;
    seniorityLevel: string;
    location: string;
}

export interface milestone {
    description: string;
    duration: number;
    amount: number;
}

export interface SearchpageDialog {
    description: string;
    amountflg: boolean;
    durationflg: boolean;
    bidDescflg: boolean;
    submitBidAmount: boolean;
}

@Component({
    selector: 'app-my-project',
    templateUrl: './my-project.component.html',
    styleUrls: ['./my-project.component.css']
})
export class MyProjectComponent implements OnInit {

    @ViewChild('addCard', {static: true}) public addCard: AddCardComponent;

    projects: any = [{}];
    collapsed: any = [{}];
    skillcollapsed: any = [{}];
    public httpParams: HttpParams;
    public types = ['Local Jobs', 'Featured Jobs', 'Recruiter Jobs', 'Full Time Jobs'];
    public skills = ['.NET', 'PHP', 'HTML', 'Javascript', 'CSS'];
    public newSkill = '';
    public firstTime = true;
    public titlesearch = '';
    public minbudget = '';
    public canceledSelected = false;
    public maxbudget = '';
    public jobskills = ['Graphic Design', 'Photography', 'Photoshop', 'Website', 'Design'];
    public pageEvent: any = 0;
    public limit = 10;
    public offset: any = 0;
    public allSelected = true;
    public inProgressSelected = false;
    public draftSelected = false;
    public completedSelected = false;
    public selectedProject = 0;

    constructor(private service: ApiService,
                private route: ActivatedRoute,
                private router: Router,
                private blockui: BlockUiService,
                private metaService: MetaService,
                public dialog: MatDialog,
                private alertService: AlertService,) {
        this.httpParams = new HttpParams();
    }

    public ngOnInit() {
        this.metaService.setTitle('My Projects | Perfectlancer');
        this.metaService.setDescription('here you can find the Projects that you have posted on the website and freelancers can view them. Check out the projects that you have published and the ones that are drafted and complete them.');
        let queryParam = this.route.snapshot.queryParamMap;
        this.titlesearch = queryParam.get('title') ? queryParam.get('title') : '';
        this.minbudget = queryParam.get('min_budget') ? queryParam.get('min_budget') : '';
        this.maxbudget = queryParam.get('max_budget') ? queryParam.get('max_budget') : '';
        this.offset = queryParam.get('offset') ? queryParam.get('offset') : 0;
        this.getprojects('all');
    }

    /**
     *
     * @param status
     */
    public getprojects(status) {
        this.service.getMyProjectsWithStatus(status).subscribe(
            res => {
                if (res) {
                    this.projects = res;
                    //console.log(this.projects);
                    var elmnt = document.getElementById('top');
                    if (elmnt != null) {
                        elmnt.scrollIntoView({block: 'end'});
                    }
                }
            },
            err => {
                this.alertService.alertError('No internet connection.');
            }
        );
    }

    /**
     *
     * @param projectId
     */
    public viewProjectBids(projectId) {
        this.selectedProject = projectId;
        this.addCard.setInitData({projectId: this.selectedProject});
        this.addCard.openModal();
    }

    public editProject(project){
        this.router.navigateByUrl('/post-job/' + project.project_id);
    }

    /**
     *
     * @param input
     */
    public onOpenBidsClick(input) {
        this.router.navigateByUrl('/panel/bids/' + input.data.projectId);
    }

    public addSkill() {
        //console.log(this.newSkill);
        if (this.newSkill != '') {
            this.skills.push(this.newSkill);
            this.newSkill = '';
        }
    }

    public addToHttpParams(key: string, value: string) {
        const params = this.httpParams.set(key, value);
    }

    public isCollapsed(id) {
        return this.collapsed[id];
    }

    public closeAll(id) {
        if (this.collapsed[id]) {
            this.collapsed[id] = false;
            setTimeout(() => {
                var elmnt = document.getElementById(id);
                elmnt.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 50);
        }
    }

    public newWindowOpen(e) {
        window.open(e);
    }

    public collapse(id) {
        // var tmp : any = document.getElementById(id);
        this.firstTime = false;
        if (this.collapsed[id] == true) {
        } else {
            this.collapsed = [{}];
            this.collapsed[id] = true;
            setTimeout(() => {
                var elmnt = document.getElementById(id);
                elmnt.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 50);
        }
        // //console.log(tmp);
        // tmp.style.height = '100px !important';
        // //console.log(tmp);
    }

    public closeDropDown(id) {
        document.getElementById('dropdown-content' + id).style.display = 'none';
    }

    public openDropDown(id) {
        if (document.getElementById('dropdown-content' + id).style.display != 'block') {
            document.getElementById('dropdown-content' + id).style.display = 'block';
        } else {
            document.getElementById('dropdown-content' + id).style.display = 'none';
        }
    }

    public filterMin(e) {
        this.minbudget = this.minbudget.replace(/[^0-9]/g, '');
        e.target.value = this.minbudget;
    }

    public filterMax(e) {
        this.maxbudget = this.maxbudget.replace(/[^0-9]/g, '');
        e.target.value = this.maxbudget;
    }

}
