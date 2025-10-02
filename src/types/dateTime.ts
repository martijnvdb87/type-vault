import { DateTimeString } from '@/utils/types.js';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class DateTime<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    DateTimeString
> {
    public toDate(): TOptions['nullable'] extends true ? Date | null : Date {
        if (this.options.nullable && this.value === null) {
            return null as TOptions['nullable'] extends true ? Date | null : Date;
        }

        return new Date(this.value as DateTimeString);
    }

    protected modifier(value: unknown) {
        const valueString = `${value}`;

        const matches = getComponents(valueString);

        if (!matches) {
            return valueString as DateTimeString;
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

        const dateString = getFormatFromComponents(components);

        const date = new Date(dateString);

        if (date.toString() === 'Invalid Date') {
            return false;
        }

        return date.toISOString() === dateString;
    }

    public static fromDate(date: Date) {
        return new DateTime(date.toISOString() as DateTimeString);
    }

    public static nullable(value: DateTimeString | null = null) {
        return new DateTime(value, { nullable: true });
    }

    public static immutable(value: DateTimeString) {
        return new DateTime(value, { immutable: true });
    }
}

function getComponents(value: string) {
    const matches = matchPattern(value);

    if (matches === null) {
        return null;
    }

    const [, year, month, day, hour, minute, second, millisecond] = matches;

    return {
        year: year ? parseInt(year) : 0,
        month: month ? parseInt(month) : 0,
        day: day ? parseInt(day) : 0,
        hour: hour ? parseInt(hour) : 0,
        minute: minute ? parseInt(minute) : 0,
        second: second ? parseInt(second) : 0,
        millisecond: millisecond ? parseInt(millisecond) : 0,
    };
}

function getFormatFromComponents(options: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
}) {
    const { year, month, day, hour, minute, second, millisecond } = options;

    return `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}.${millisecond.toString().padEnd(3, '0')}Z` as DateTimeString;
}

function isValidFormat(value: string) {
    return Boolean(matchPattern(value));
}

function matchPattern(value: string) {
    return value.match(
        /^(\d{1,4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2}):(\d{1,2})(?:.(\d{1,3}))?Z$/
    );
}
