import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from "@angular/material/dialog";
import { Subject } from 'rxjs';
import { ApiService } from 'app/modules/admin/services/api.service';
import { DialogAddressComponent } from '../dialog-address/dialog-address.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { address } from '../../models/address.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { VariableService } from 'app/shared/variable.service';

@Component({
    selector: 'dialog-iFrame',
    templateUrl: 'dialog-iFrame.component.html'
})
export class DialogIFrameComponent {
    url: string;

    constructor(
        private dialog: MatDialog,
        public dialogRef: MatDialogRef<DialogIFrameComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.url = data.url;
    }

    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close(false);
    }
    onYesClick(): void {
        this.dialogRef.close(true);
    }
}