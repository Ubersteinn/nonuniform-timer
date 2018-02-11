import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StepGroupModel, Duration } from '../../shared';

@Component({
  selector: 'app-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css']
})
export class RunnerComponent implements OnChanges {

  @Input() model: StepGroupModel;

  constructor(public dialog: MatDialog) {

  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && this.model) {

    }
  }
}
