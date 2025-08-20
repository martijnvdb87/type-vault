import { v1, version } from 'uuid';
import { Uuid } from './uuid.js';

export class Uuidv1 extends Uuid {
    public validate(value: unknown): boolean {
        return super.validate(value) && version(String(value)) === 1;
    }

    public static random() {
        return new Uuidv1(v1());
    }
}
