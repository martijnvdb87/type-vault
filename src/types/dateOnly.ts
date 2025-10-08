import { DateOnlyValue } from '@/utils/types.js';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class DateOnly<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    DateOnlyValue
> {
    public toDate(): TOptions['nullable'] extends true ? Date | null : Date {
        if (this.options.nullable && this.value === null) {
            return null as TOptions['nullable'] extends true ? Date | null : Date;
        }

        return new Date(toDateTimeString(this.value as DateOnlyValue));
    }

    protected modifier(value: unknown) {
        const valueString = `${value}`;

        const matches = getComponents(valueString);

        if (!matches) {
            return valueString as DateOnlyValue;
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

    public static fromDate(date: Date) {
        const dateString = date.toISOString();
        const dateStringWithoutTime = dateString.split('T')[0];

        return new DateOnly(dateStringWithoutTime as DateOnlyValue);
    }

    public static nullable(value: DateOnlyValue | null = null) {
        return new DateOnly(value, { nullable: true });
    }

    public static immutable(value: DateOnlyValue) {
        return new DateOnly(value, { immutable: true });
    }
}

function toDateTimeString(value: string) {
    return `${value}T00:00:00.000Z`;
}

function getComponents(value: string) {
    const matches = matchPattern(value);

    if (matches === null) {
        return null;
    }

    const [, year, month, day] = matches;

    return {
        year: year ? parseInt(year) : 0,
        month: month ? parseInt(month) : 0,
        day: day ? parseInt(day) : 0,
    };
}

function getFormatFromComponents(options: { year: number; month: number; day: number }) {
    const { year, month, day } = options;

    return `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}` as DateOnlyValue;
}

function isValidFormat(value: string) {
    return Boolean(matchPattern(value));
}

function matchPattern(value: string) {
    return value.match(/^(\d{1,4})-(\d{1,2})-(\d{1,2})$/);
}
