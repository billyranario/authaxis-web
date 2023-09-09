import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ui-confirm',
  templateUrl: './ui-confirm.component.html',
  styleUrls: ['./ui-confirm.component.scss']
})
export class UiConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<UiConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string },
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
