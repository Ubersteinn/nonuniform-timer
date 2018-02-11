/**
 * An Immutable time duration representation
*/
export class Duration {

    private _ms: number;

    public get milliseconds(): number {
        return this._ms;
    }
    public get seconds(): number {
        return this._ms / Duration.msInSec;
    }
    public get minutes(): number {
        return this._ms / Duration.msInMin;
    }
    public get hours(): number {
        return this._ms / Duration.msInHour;
    }

    static get msInSec(): number {   return 1000; }
    static get secInMin(): number {  return 60; }
    static get minInHour(): number { return 60; }

    static get msInMin(): number {
        return Duration.msInSec * Duration.secInMin;
    }
    static get msInHour(): number {
        return Duration.msInSec * Duration.secInMin * Duration.minInHour;
    }
    static get secInHour(): number {
        return Duration.secInMin * Duration.minInHour;
    }

    constructor(ms: number = Duration.msInMin) {
        this._ms = ms;
    }

    /**
     * Creates an immutable Time object
     * @param time milliseconds or object with seconds, minutes or hours
     */
    public static create(time: { seconds?: number, minutes?: number, hours?: number } | number): Duration {
        const t = new Duration();

        if (typeof time === 'number') {
            t._ms = time;
        } else if (typeof time === 'object') {
            t._ms = (time.seconds ? time.seconds * Duration.msInSec  : 0) +
                    (time.minutes ? time.minutes * Duration.msInMin  : 0) +
                    (time.hours   ? time.hours   * Duration.msInHour : 0);
        }

        return t;
    }

    public clone(): Duration {
        return new Duration(this._ms);
    }
}
