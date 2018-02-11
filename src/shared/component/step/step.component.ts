import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Duration } from '../../utility/duration';

@Component({
    selector: 'app-step',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './step.component.html',
    styleUrls: ['./step.component.css']
})
export class StepComponent {

  @Input() name: string;
  @Input() duration: Duration;

  constructor() {

  }
}
