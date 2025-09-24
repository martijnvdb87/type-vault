import { UuidString } from '@/utils/types.js';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class Uuid<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    UuidString
> {
    protected validate(value: unknown): boolean {
        if (!super.validate(value)) {
            return false;
        }

        const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        return pattern.test(value as string);
    }

    public static nil(): Uuid {
        return new Uuid('00000000-0000-0000-0000-000000000000');
    }

    public static random() {
        return new Uuid(crypto.randomUUID());
    }

    public static nullable(value: UuidString | null = null) {
        return new Uuid(value, { nullable: true });
    }

    public static immutable(value: UuidString) {
        return new Uuid(value, { immutable: true });
    }
}
