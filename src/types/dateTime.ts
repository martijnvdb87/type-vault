import { DateTimeString } from '@/utils/types.js';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class DateTime<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    DateTimeString
> {
    protected modifier(value: unknown) {
        return modifier(value) as DateTimeString;
    }

    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3})?Z$/;

        return pattern.test(value);
    }

    public static nullable(value: DateTimeString | null = null) {
        return new DateTime(value, { nullable: true });
    }

    public static immutable(value: DateTimeString) {
        return new DateTime(value, { immutable: true });
    }
}

function modifier(value: unknown): string {
    if (value instanceof DateTime) {
        value = value.value;
    }

    return value as string;
}
