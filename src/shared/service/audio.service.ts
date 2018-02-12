import { Injectable } from '@angular/core';

import { StepGroupModel } from '../model/stepgroup.model';
import { StepModel } from '../model/step.model';
import { Duration } from '../utility/duration';

@Injectable()
export class AudioService {

  private audioMap = [
    'assets/Piano_ff_C4.mp3', // stepEnding
    'assets/Piano_ff_C5.mp3', // stepEnd
    'assets/Piano_ff_C5.mp3', // stepGroupEnding
    'assets/Piano_ff_C6.mp3', // stepGroupEnd
    'assets/Piano_ff_C4.mp3'  // stepGroupStart
  ];

  constructor() {

  }

  public play(event: AudioEvent) {
    const audio = new Audio();
    const src = this.audioMap[event];
    if (!src) {
      return;
    }

    audio.src = src;
    audio.play();
  }

  public setAudio(event: AudioEvent, src: string) {
    this.audioMap[event] = src;
  }
}

export enum AudioEvent {
  stepEnding      = 0,
  stepEnd         = 1,
  stepGroupEnding = 2,
  stepGroupEnd    = 3,
  stepGroupStart  = 4
}
