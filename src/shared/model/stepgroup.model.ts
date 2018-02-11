import { StepModel } from './step.model';
import { Rename } from '../interface/rename.interface';

export class StepGroupModel implements Rename {

    public name: string;
    public steps: StepModel[];

    constructor() {
        this.name = 'new step group';
        this.steps = [];
    }
}
