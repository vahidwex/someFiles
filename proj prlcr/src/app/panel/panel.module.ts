import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Modules
import { PipeModule } from '../pipes/pipe.module';
import { PublicDirectivesModule } from "../public-directives/public-directives.module";

// Components
import { MainPanelComponent } from "./main-panel.component";
import { EmployerDashboardComponent } from "./employer-dashboard/employer-dashboard.component";
import { MessageComponent } from "./message/message.component";
import { DialogSampleWork, DialogSampleWorkView, FreelancerProfileComponent } from "./freelancer-profile/freelancer-profile.component";
import { MyProjectComponent } from "./my-project/my-project.component";
import { MilestonesComponent } from "./milestones/milestones.component";
import { BookmarkComponent } from './bookmark/bookmark.component';
import { PanelBidsComponent } from "./panel-bids/panel-bids.component";
import { AddMilestoneDialog, WorkdiaryComponent } from "./workdiary/workdiary.component";
import { BuyBidProfileDialog } from "./freelancer-profile/freelancer-profile.component";

// Services
import { PushMessageService } from '../tools/PushMessage.service';
import { MessageService } from '../Services/message.service';
import { EmployerRoleGuardService } from "../rolegaurd/employer-role-gaurd.service";
import { FreelancerRoleGuardService } from "../rolegaurd/freelancer-role-gaurd.service";
import { DynamicScriptLoaderService } from '../tools/dynamicscriptloader-service';

@NgModule({
    declarations: [
        MainPanelComponent,
        EmployerDashboardComponent,
        MessageComponent,
        FreelancerProfileComponent,
        MyProjectComponent,
        PanelBidsComponent,
        MilestonesComponent,
        BookmarkComponent,
        AddMilestoneDialog,
        WorkdiaryComponent,
        DialogSampleWork,
        BuyBidProfileDialog,
        DialogSampleWorkView
    ],
    exports: [],
    imports: [
        RouterModule.forChild([
            {
                children: [
                    {
                        canActivate: [EmployerRoleGuardService],
                        path: 'dashboard',
                        component: EmployerDashboardComponent
                    },
                    {
                        path: 'message',
                        component: MessageComponent,
                    },
                    {
                        path: 'profile',
                        component: FreelancerProfileComponent
                    },
                    {
                        canActivate: [EmployerRoleGuardService],
                        path: 'my-project',
                        component: MyProjectComponent
                    },
                    {
                        path: 'bookmarks',
                        component: BookmarkComponent
                    },
                    {
                        path: 'bids',
                        component: PanelBidsComponent
                    },
                    {
                        path: 'bids/:projectId',
                        component: PanelBidsComponent
                    },
                    {
                        canActivate: [FreelancerRoleGuardService],
                        path: 'milestone/:project_id',
                        component: MilestonesComponent
                    },
                    {
                        canActivate: [EmployerRoleGuardService],
                        path : 'workdiary/:project_id',
                        component: WorkdiaryComponent
                    },
                    {
                        redirectTo: 'profile',
                        path: '**',
                    },
                ],
                component: MainPanelComponent,
                path: '',
            }
        ]),
        CommonModule,
        PipeModule,
        PublicDirectivesModule
    ],
    providers: [
        PushMessageService,
        MessageService,
        EmployerRoleGuardService,
        FreelancerRoleGuardService,
        DynamicScriptLoaderService
    ],
    entryComponents: [
        DialogSampleWork,
        DialogSampleWorkView,
        BuyBidProfileDialog
    ],
})

export class PanelModule {
constructor(){}


    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        console.log('test');
        
    }

private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    // this.dynamicScriptLoader.loadExternalStyles()
  }
}
