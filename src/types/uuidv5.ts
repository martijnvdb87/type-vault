import { v5, version } from 'uuid';
import { TypeOption } from './type.js';
import { Uuid } from './uuid.js';

export class Uuidv5<TOptions extends TypeOption = TypeOption> extends Uuid<TOptions> {
    protected validate(value: unknown): boolean {
        return super.validate(value) && version(String(value)) === 5;
    }

    public static random(value: string, namespace: Uuid) {
        return new Uuidv5(v5(value, namespace.value));
    }
}
