import { v5, version } from 'uuid';
import { Uuid } from './uuid.js';

export class Uuidv5 extends Uuid {
    public validate(value: unknown): boolean {
        return super.validate(value) && version(String(value)) === 5;
    }

    public static random(value: string, namespace: Uuid) {
        return new Uuidv5(v5(value, namespace.value));
    }
}
