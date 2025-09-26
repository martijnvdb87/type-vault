import { TimeOnlyString } from '@/utils/types.js';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class TimeOnly<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    TimeOnlyString
> {
    protected modifier(value: unknown) {
        const valueString = `${value}`;

        const matches = valueString.match(/^(\d{2}):(\d{2}):(\d{2})(?:.(\d{3}))?/);

        if (!matches) {
            return valueString as TimeOnlyString;
        }

        const [, hour, minute, second, millisecond = '000'] = matches;

        return `${hour}:${minute}:${second}.${millisecond}` as TimeOnlyString;
    }

    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        return Boolean(value.match(/^\d{2}:\d{2}:\d{2}.\d{3}$/));
    }

    public static nullable(value: TimeOnlyString | null = null) {
        return new TimeOnly(value, { nullable: true });
    }

    public static immutable(value: TimeOnlyString) {
        return new TimeOnly(value, { immutable: true });
    }
}
