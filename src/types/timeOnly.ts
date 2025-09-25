import { TimeOnlyString } from '@/utils/types.js';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class TimeOnly<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    TimeOnlyString
> {
    protected modifier(value: unknown) {
        return modifier(value) as TimeOnlyString;
    }

    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        return Boolean(value.match(/^\d{2}:\d{2}:\d{2}(.\d{3})?$/));
    }

    public static nullable(value: TimeOnlyString | null = null) {
        return new TimeOnly(value, { nullable: true });
    }

    public static immutable(value: TimeOnlyString) {
        return new TimeOnly(value, { immutable: true });
    }
}

function modifier(value: unknown): string {
    if (value instanceof TimeOnly) {
        value = value.value;
    }

    return value as string;
}
