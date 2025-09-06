import { UuidString } from '@/utils/types.js';
import { v7, version } from 'uuid';
import { TypeOption } from './type.js';
import { Uuid } from './uuid.js';

export class Uuidv7<TOptions extends TypeOption = TypeOption> extends Uuid<TOptions> {
    protected validate(value: unknown): boolean {
        return super.validate(value) && version(String(value)) === 7;
    }

    public static random() {
        return new Uuidv7(v7() as UuidString);
    }

    public static nullable(value: UuidString | null = null) {
        return new Uuidv7(value, { nullable: true });
    }

    public static immutable(value: UuidString) {
        return new Uuidv7(value, { immutable: true });
    }
}
