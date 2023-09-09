import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ClipboardModule } from '@angular/cdk/clipboard';

const angularModules = [
  MatDialogModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  ClipboardModule,
];

@NgModule({
  exports: [...angularModules],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MaterialModule {}
