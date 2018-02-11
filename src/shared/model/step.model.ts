import { Duration } from '../utility/duration';
import { Name } from '../interface/name.interface';

export class StepModel implements Name {

    public name: string;
    public duration: Duration;

    constructor() {
        this.name = 'new step';
        this.duration = new Duration();
    }
}
