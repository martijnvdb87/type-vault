import { UuidString } from '@/utils/types.js';
import { validate } from 'uuid';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class Uuid<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    UuidString
> {
    protected validate(value: unknown): boolean {
        return super.validate(value) && validate(value);
    }

    public static nil(): Uuid {
        return new Uuid('00000000-0000-0000-0000-000000000000');
    }

    public static nullable(value: UuidString | null = null) {
        return new Uuid(value, { nullable: true });
    }

    public static immutable(value: UuidString) {
        return new Uuid(value, { immutable: true });
    }
}

const yay = new Uuid('00000000-0000-0000-0000-000000000000', { nullable: true, immutable: false });
yay.value = null;
