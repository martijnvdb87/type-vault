import { DateOnlyString } from '@/utils/types.js';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class DateOnly<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    DateOnlyString
> {
    protected modifier(value: unknown) {
        return modifier(value) as DateOnlyString;
    }

    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        const pattern = /^\d{4}-\d{2}-\d{2}$/;

        if (!pattern.test(value)) {
            return false;
        }

        const date = new Date(toDateTimeString(value));

        if (date.toString() === 'Invalid Date') {
            return false;
        }

        return date.toISOString() === toDateTimeString(value);
    }

    public static nullable(value: DateOnlyString | null = null) {
        return new DateOnly(value, { nullable: true });
    }

    public static immutable(value: DateOnlyString) {
        return new DateOnly(value, { immutable: true });
    }
}

function modifier(value: unknown): string {
    if (value instanceof DateOnly) {
        value = value.value;
    }

    return value as string;
}

function toDateTimeString(value: string) {
    return `${value}T00:00:00.000Z`;
}
