import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StepGroupModel } from '../shared';
import { RenameDialogComponent } from '../shared/component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public stepGroups: StepGroupModel[];
  public activeStepGroup: StepGroupModel;
  public isEditing: boolean;

  public get activeIndex(): number {
    if (!this.activeStepGroup) {
      return -1;
    }
    return this.stepGroups.indexOf(this.activeStepGroup);
  }

  constructor(public dialog: MatDialog) {
    this.stepGroups = [];
    this.initStepGroups(3);
    this.isEditing = false;
  }

  public onEdit() {
    this.isEditing = true;
  }

  public onSaveEdit() {
    this.isEditing = false;
  }

  public onCancelEdit() {
    this.isEditing = false;
  }

  public onCreateStepGroup() {
    this.activeStepGroup = this.createStepGroup();
    this.isEditing = true;
  }

  public onImportStepGroup() {

  }

  public onExportStepGroup() {

  }

  public onRenameStepGroup() {
    const dialogRef = this.dialog.open(RenameDialogComponent, {
      width: '250px',
      data: this.activeStepGroup
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.activeStepGroup.name = result;
    });
  }

  public onDeleteStepGroup() {
    this.stepGroups.splice(this.activeIndex, 1);
    if (this.stepGroups.length === 0) {
      this.createStepGroup();
    }
    this.activeStepGroup = this.stepGroups[0];
  }

  private createStepGroup(): StepGroupModel {
    const sg = new StepGroupModel();
    this.stepGroups.push(sg);
    sg.name += ' ' + this.stepGroups.length;
    return sg;
  }

  private initStepGroups(count: number) {
    for (let i = 0; i < count; i++) {
      this.createStepGroup();
    }
    this.activeStepGroup = this.stepGroups[0];
  }
}
