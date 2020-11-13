import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'buy-bid-dialog',
    styleUrls: ['./buy-bid-dialog.css'],
    templateUrl: './buy-bid-dialog.html'
})

export class BuyBidDialog {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public dialogRef: MatDialogRef<BuyBidDialog>) {}

    public ngOnInit() {}

    public onNoClick() {
        this.dialogRef.close();
    }

}
