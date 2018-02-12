import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import {
  StepGroupModel, StepModel, Duration, RunnerService,
  RenameDialogComponent
} from '../shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public stepGroups: StepGroupModel[];
  public isEditing: boolean;
  public runningIndex: number;

  private _displayDuration: string;
  private _activeStepGroup: StepGroupModel;

  public get activeStepGroup(): StepGroupModel {
    return this._activeStepGroup;
  }
  public set activeStepGroup(sg: StepGroupModel) {
    this._activeStepGroup = sg;
    this.sumDurations();
  }

  public get displayDuration(): string {
    if (this._displayDuration) {
        return this._displayDuration;
    }
    return this.sumDurations();
  }

  private get activeIndex(): number {
    if (!this.activeStepGroup) {
      return -1;
    }
    return this.stepGroups.indexOf(this.activeStepGroup);
  }

  constructor(
    public dialog: MatDialog,
    public runner: RunnerService
  ) {
    this.stepGroups = [];
    this.initStepGroups(5);
    this.isEditing = false;
    this.runningIndex = 0;
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

  public onCopyStepGroup() {

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

  public onStartStep() {
    this.runner.run(this.activeStepGroup);
  }

  public onStopStep() {
    this.runner.stop();
  }

  public onPauseStep() {
    this.runner.pause();
  }

  public onAddStep() {
    this.createStep();
    this.sumDurations();
  }

  private sumDurations(): string {
    const d = this.activeStepGroup.totalDuration;
    this._displayDuration = d.hours + ':' + d.minutes + ':' + d.seconds;
    return this._displayDuration;
  }

  private createStepGroup(): StepGroupModel {
    const sg = new StepGroupModel();
    this.stepGroups.push(sg);
    sg.name += ' ' + this.stepGroups.length;
    return sg;
  }

  private createStep(): StepModel {
    const step = new StepModel();
    this.activeStepGroup.steps.push(step);
    step.duration = Duration.create(Math.round(Math.random() * 10000));
    step.name += ' ' + this.activeStepGroup.steps.length;
    return step;
  }

  private initStepGroups(count: number) {

    this.activeStepGroup = this.createStepGroup();
    this.activeStepGroup.name = 'Ones for Ten';
    for (let s = 0; s < 10; s++) {
      const step = new StepModel();
      step.duration = Duration.create(60000);
      this.activeStepGroup.steps.push(step);
    }

    for (let i = 0; i <= count; i++) {
      this.activeStepGroup = this.createStepGroup();

      for (let j = 0; j <= i * i; j++) {
        this.createStep();
      }
    }
    this.activeStepGroup = this.stepGroups[0];
  }
}
