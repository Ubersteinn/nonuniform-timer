import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StepGroupModel, StepModel, Duration } from '../shared';
import { RenameDialogComponent } from '../shared/component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public stepGroups: StepGroupModel[];
  public isEditing: boolean;

  private _totalDuration: string;
  private _activeStepGroup: StepGroupModel;

  public get activeStepGroup(): StepGroupModel {
    return this._activeStepGroup;
  }
  public set activeStepGroup(sg: StepGroupModel) {
    this._activeStepGroup = sg;
    this.sumDurations();
  }

  public get totalDuration(): string {
    if (this._totalDuration) {
        return this._totalDuration;
    }
    return this.sumDurations();
  }

  private get activeIndex(): number {
    if (!this.activeStepGroup) {
      return -1;
    }
    return this.stepGroups.indexOf(this.activeStepGroup);
  }

  constructor(public dialog: MatDialog) {
    this.stepGroups = [];
    this.initStepGroups(5);
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

  private sumDurations(): string {
    let ms = 0;
    if (this.activeStepGroup) {
      this.activeStepGroup.steps.forEach(step => {
        ms += step.duration.ms;
      });
    }
    const d = Duration.create(ms);
    this._totalDuration = d.hours + ':' + d.minutes + ':' + d.seconds;
    return this._totalDuration;
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

      for (let j = 0; j < i * i; j++) {
        const step = new StepModel();
        step.name += ' ' + j;
        step.duration = Duration.create(Math.round(Math.random() * 1000) * 15000 + 10000);
        this.stepGroups[i].steps.push(step);
      }
    }
    this.activeStepGroup = this.stepGroups[0];
  }
}
