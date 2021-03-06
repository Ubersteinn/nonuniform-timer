import { Injectable, EventEmitter, ApplicationRef } from '@angular/core';

import { StepGroupModel } from '../model/stepgroup.model';
import { StepModel } from '../model/step.model';
import { Duration } from '../utility/duration';
import { AudioService, AudioEvent } from './audio.service';

@Injectable()
export class RunnerService {

  private _stepGroup: StepGroupModel;
  private _totalDuration: Duration;
  private _totalStartDate: number;
  private _stepStartDate: number;

  public runningStepIndex: number;
  public finish: EventEmitter<boolean>;
  public stepEndingAlert: Duration;
  public stepEndgingAlerted: boolean;

  private get runningStep(): StepModel {
    return this._stepGroup.steps[this.runningStepIndex];
  }

  private get totalElapsedTime(): number {
    if (!this.isRunning) {
      return 0;
    }
    return Date.now() - this._totalStartDate;
  }

  private get stepElapsedTime(): number {
    if (!this.isRunning) {
      return 0;
    }
    return Date.now() - this._stepStartDate;
  }

  public get isRunning(): boolean {
    return this._stepGroup !== undefined;
  }

  public get totalRemaining(): Duration {
    return Duration.create(this._totalDuration.ms - this.totalElapsedTime);
  }

  public get stepRemaining(): Duration {
    const duration = Duration.create(this.runningStep.duration.ms - this.stepElapsedTime);

    if (!this.stepEndgingAlerted && duration.ms - this.stepEndingAlert.ms < 0) {
      this.stepEndgingAlerted = true;
      this.audio.play(AudioEvent.stepEnding);
    }
    if (duration.ms < 0) {
      this.audio.play(AudioEvent.stepEnd);
      this.runningStepIndex++;
      if (this.stepEndingAlert.ms < this.runningStep.duration.ms) {
        this.stepEndgingAlerted = false;
      }
      this._stepStartDate = Date.now();
      return Duration.create(0);
    }
    return duration;
  }

  constructor(
    private ref: ApplicationRef,
    private audio: AudioService
  ) {

    setInterval(() => {
      if (!this.isRunning) {
        return;
      }

      this.ref.tick();

      if (this.runningStepIndex >= this._stepGroup.steps.length) {
        this.stop(true);
        this.audio.play(AudioEvent.stepGroupEnd);
      }
    }, 1000);

    this.runningStepIndex = 0;
    this.stepEndingAlert = Duration.create(15000);
    this.stepEndgingAlerted = false;
    this.finish = new EventEmitter<boolean>();
  }

  /**
   * Uses the given step group to count down with.
   * @param sg step group to run
   */
  public run(sg: StepGroupModel) {
    if (this._stepGroup) {
      return;
    }

    this.runningStepIndex = 0;
    this._totalDuration = sg.totalDuration;
    this._totalStartDate = Date.now();
    this._stepStartDate = Date.now();
    this._stepGroup = sg;
  }

  public pause() {

  }

  public stop(success: boolean = false) {
    this._stepGroup = undefined;
    this._totalDuration = undefined;
    this._totalStartDate = undefined;
    this._stepStartDate = undefined;
    this.runningStepIndex = 0;
    this.finish.emit(success);
  }
}
