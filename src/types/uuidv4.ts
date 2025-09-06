import { UuidString } from '@/utils/types.js';
import { v4, version } from 'uuid';
import { TypeOption } from './type.js';
import { Uuid } from './uuid.js';

export class Uuidv4<TOptions extends TypeOption = TypeOption> extends Uuid<TOptions> {
    protected validate(value: unknown): boolean {
        return super.validate(value) && version(String(value)) === 4;
    }

    public static random() {
        return new Uuidv4(v4() as UuidString);
    }

    public static nullable(value: UuidString | null = null) {
        return new Uuidv4(value, { nullable: true });
    }

    public static immutable(value: UuidString) {
        return new Uuidv4(value, { immutable: true });
    }
}
