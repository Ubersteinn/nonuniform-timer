import { Duration } from '../utility/duration';
import { Rename } from '../interface/rename.interface';

export class StepModel implements Rename {

    public name: string;
    public duration: Duration;

    constructor() {
        this.name = 'new step';
        this.duration = new Duration();
    }
}
