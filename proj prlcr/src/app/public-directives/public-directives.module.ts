import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { TagInputModule } from "ngx-chips";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material';
import { ImageCropperModule } from "ngx-image-cropper";
import { ShareButtonsModule } from "ngx-sharebuttons";

// Components
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { HeaderPublicComponent } from "./header-public/header-public.component";
import { BuyBidDialog } from "./buy-bid-dialog/buy-bid-dialog";
import { BidDialog } from "./bid-dialog/bid-dialog";
import { CheckoutComponent } from "./checkout/checkout.component";
import { AddCardComponent } from "./add-card/add-card.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { ImageCropperModalDirective } from "./image-cropper/image-cropper-modal.directive";
import { LocalJobsComponent } from '../pages/localjobs/local-jobs.component';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        HeaderPublicComponent,
        BuyBidDialog,
        BidDialog,
        CheckoutComponent,
        AddCardComponent,
        LocalJobsComponent,
        PaginationComponent,
        ImageCropperModalDirective
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        FooterComponent,
        HeaderComponent,
        HeaderPublicComponent,
        TagInputModule,
        MatPaginatorModule,
        MatDialogModule,
        MatProgressBarModule,
        CheckoutComponent,
        AddCardComponent,
        PaginationComponent,
        ImageCropperModalDirective,
        ShareButtonsModule
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TagInputModule,
        MatPaginatorModule,
        MatDialogModule,
        MatProgressBarModule,
        ImageCropperModule,
        ShareButtonsModule.forRoot()
    ],
})

export class PublicDirectivesModule {}
