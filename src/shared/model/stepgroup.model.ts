import { StepModel } from './step.model';
import { Name } from '../interface/name.interface';

export class StepGroupModel implements Name {

    public name: string;
    public steps: StepModel[];

    constructor() {
        this.name = 'new step group';
        this.steps = [];
    }
}
