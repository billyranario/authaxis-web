import { Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogConfig } from '../../configs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  open<T>(component: Type<T>, config?: any): MatDialogRef<T> {
    const dialogRef: MatDialogRef<any> = this.dialog.open(component, {
      width: DialogConfig.sizes.md,
      disableClose: true,
      ...config, // this will override above default config
    });

    return dialogRef;
  }
}
