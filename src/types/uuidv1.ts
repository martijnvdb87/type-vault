import { UuidString } from '@/utils/types.js';
import { v1, version } from 'uuid';
import { TypeOption } from './type.js';
import { Uuid } from './uuid.js';

export class Uuidv1<TOptions extends TypeOption = TypeOption> extends Uuid<TOptions> {
    protected validate(value: unknown): boolean {
        return super.validate(value) && version(String(value)) === 1;
    }

    public static random() {
        return new Uuidv1(v1() as UuidString);
    }

    public static nullable(value: UuidString | null = null) {
        return new Uuidv1(value, { nullable: true });
    }

    public static immutable(value: UuidString) {
        return new Uuidv1(value, { immutable: true });
    }
}
