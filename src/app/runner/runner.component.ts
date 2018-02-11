import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StepGroupModel, Duration, RunnerService, StepModel } from '../../shared';

@Component({
  selector: 'app-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css']
})
export class RunnerComponent {

  @Input() model: StepGroupModel;

  private nextCount = 4; // TODO should come from a settings service
  private nextSeparationFromRunning = 1;
  private runningHeightPx = 37;
  private runningFontSizetPct = 200;
  private idleHeightPx = 20;
  private idleFontSizetPct = 100;

  public get runningIndex(): number {
    return this.runner.runningStepIndex;
  }

  constructor(
    public dialog: MatDialog,
    public runner: RunnerService
  ) {

  }

  public stepStyleStatus(index: number): { 'font-size': string, 'height': string } {
    const style = { 'font-size': '100%', 'height': '20px' };

    if (index === this.runningIndex) {
      style['font-size'] = this.runningFontSizetPct + '%';
      style['height'] = this.runningHeightPx + 'px';
    } else if (index > this.runningIndex && index <= this.runningIndex + this.nextCount) {
      style['font-size'] = this.calculateNextFontSize(index - this.runningIndex) + '%';
      style['height'] = this.calculateNextHeight(index - this.runningIndex) + 'px';
    } else {
      style['font-size'] = this.idleFontSizetPct + '%';
      style['height'] = this.idleHeightPx + 'px';
    }
    return style;
  }

  public stepDuration(step: StepModel, index: number): Duration {
    if (!this.runner.isRunning) {
      return step.duration;
    }
    if (index === this.runningIndex) {
      return this.runner.stepRemaining;
    }
    if (index > this.runningIndex) {
      return step.duration;
    }
    return Duration.create(0);
  }

  // TODO should come from a settings service
  private calculateNextFontSize(nextIndex: number): number {
    return this.idleFontSizetPct + (this.runningFontSizetPct - this.idleFontSizetPct) / (nextIndex + this.nextSeparationFromRunning);
  }

  // TODO should come from a settings service
  private calculateNextHeight(nextIndex: number): number {
    return this.idleHeightPx + (this.runningHeightPx - this.idleHeightPx) / (nextIndex + this.nextSeparationFromRunning);
  }
}
