import { TimeOnlyValue } from '@/utils/types.js';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class TimeOnly<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    TimeOnlyValue
> {
    protected modifier(value: unknown) {
        const valueString = `${value}`;

        const matches = getComponents(valueString);

        if (!matches) {
            return valueString as TimeOnlyValue;
        }

        return getFormatFromComponents(matches);
    }

    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        if (!isValidFormat(value)) {
            return false;
        }

        const components = getComponents(value);

        if (!components) {
            return false;
        }

        const dateString = toDateTimeString(getFormatFromComponents(components));

        const date = new Date(dateString);

        if (date.toString() === 'Invalid Date') {
            return false;
        }

        return date.toISOString() === dateString;
    }

    public static nullable(value: TimeOnlyValue | null = null) {
        return new TimeOnly(value, { nullable: true });
    }

    public static immutable(value: TimeOnlyValue) {
        return new TimeOnly(value, { immutable: true });
    }
}

function toDateTimeString(value: string) {
    return `0000-01-01T${value}Z`;
}

function getComponents(value: string) {
    const matches = matchPattern(value);

    if (matches === null) {
        return null;
    }

    const [, hour, minute, second, millisecond] = matches;

    return {
        hour: hour ? parseInt(hour) : 0,
        minute: minute ? parseInt(minute) : 0,
        second: second ? parseInt(second) : 0,
        millisecond: millisecond ? parseInt(millisecond) : 0,
    };
}

function getFormatFromComponents(options: {
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
}) {
    const { hour, minute, second, millisecond } = options;

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}.${millisecond.toString().padEnd(3, '0')}` as TimeOnlyValue;
}

function isValidFormat(value: string) {
    return Boolean(matchPattern(value));
}

function matchPattern(value: string) {
    return value.match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})(?:.(\d{1,3}))?$/);
}
