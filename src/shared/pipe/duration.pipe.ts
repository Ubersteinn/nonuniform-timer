import { Pipe, PipeTransform } from '@angular/core';

import { Duration } from '../utility/duration';
/*
 * Display a Duration object as a string HH:MM:SS.mmm
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | duration:showMilliseconds
*/
@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {

    public transform(value: Duration, showMilliseconds: string): string {
    return value.hours + ':' +
           value.minutes + ':' +
           value.seconds +
           (showMilliseconds ? '.' + value.milliseconds : '');
  }

}
