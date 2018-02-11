import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Rename } from '../../interface/rename.interface';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'rename-dialog',
    templateUrl: 'rename.component.html',
})
export class RenameDialogComponent {

  public name: string;

  constructor(
    public dialogRef: MatDialogRef<RenameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rename) {

      this.name = data.name;
    }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
