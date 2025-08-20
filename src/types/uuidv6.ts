import { v6, version } from 'uuid';
import { Uuid } from './uuid.js';

export class Uuidv6 extends Uuid {
    public validate(value: unknown): boolean {
        return super.validate(value) && version(String(value)) === 6;
    }

    public static random() {
        return new Uuidv6(v6());
    }
}
