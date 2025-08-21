import { v7, version } from 'uuid';
import { Uuid } from './uuid.js';

export class Uuidv7 extends Uuid {
    protected validate(value: unknown): boolean {
        return super.validate(value) && version(String(value)) === 7;
    }

    public static random() {
        return new Uuidv7(v7());
    }
}
