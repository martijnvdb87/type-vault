import { UuidString } from '@/utils/types.js';
import { v6, version } from 'uuid';
import { TypeOption } from './type.js';
import { Uuid } from './uuid.js';

export class Uuidv6<TOptions extends TypeOption = TypeOption> extends Uuid<TOptions> {
    protected validate(value: unknown): boolean {
        return super.validate(value) && version(String(value)) === 6;
    }

    public static random() {
        return new Uuidv6(v6() as UuidString);
    }

    public static nullable(value: UuidString | null = null) {
        return new Uuidv6(value, { nullable: true });
    }

    public static immutable(value: UuidString) {
        return new Uuidv6(value, { immutable: true });
    }
}
