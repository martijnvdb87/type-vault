import { v3, version } from 'uuid';
import { Uuid } from './uuid.js';

export class Uuidv3 extends Uuid {
    protected validate(value: unknown): boolean {
        return super.validate(value) && version(String(value)) === 3;
    }

    public static random(value: string, namespace: Uuid) {
        return new Uuidv3(v3(value, namespace.value));
    }
}
