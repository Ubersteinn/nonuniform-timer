import { StepModel } from './step.model';
import { Name } from '../interface/name.interface';
import { Duration } from '../utility/duration';

export class StepGroupModel implements Name {

    public name: string;
    public steps: StepModel[];

    public get totalDuration(): Duration {
        let ms = 0;
        this.steps.forEach(step => {
            ms += step.duration.ms;
        });
        return Duration.create(ms);
    }

    constructor() {
        this.name = 'new step group';
        this.steps = [];
    }
}
