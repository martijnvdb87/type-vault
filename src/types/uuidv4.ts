import { v4, version } from 'uuid';
import { Uuid } from './uuid.js';

export class Uuidv4 extends Uuid {
    protected validate(value: unknown): boolean {
        return super.validate(value) && version(String(value)) === 4;
    }

    public static random() {
        return new Uuidv4(v4());
    }
}
