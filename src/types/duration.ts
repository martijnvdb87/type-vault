import { DurationValue } from '@/utils/types.js';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class Duration<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    DurationValue
> {
    protected modifier(value: unknown) {
        const valueString = `${value}`;

        const matches = getComponents(valueString);

        if (!matches) {
            return valueString as DurationValue;
        }

        return getFormatFromComponents(matches);
    }

    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        return isValidFormat(value);
    }

    public static nullable(value: DurationValue | null = null) {
        return new Duration(value, { nullable: true });
    }

    public static immutable(value: DurationValue) {
        return new Duration(value, { immutable: true });
    }
}

function getComponents(value: string) {
    const matches = matchPattern(value);

    if (matches === null) {
        return null;
    }

    const [, year, month, day, hour, minute, second] = matches;

    return {
        year: year ? parseFloat(year) : 0,
        month: month ? parseFloat(month) : 0,
        day: day ? parseFloat(day) : 0,
        hour: hour ? parseFloat(hour) : 0,
        minute: minute ? parseFloat(minute) : 0,
        second: second ? parseFloat(second) : 0,
    };
}

function getFormatFromComponents(options: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
}) {
    const { year, month, day, hour, minute, second } = options;

    return `P${year}Y${month}M${day}DT${hour}H${minute}M${second}S` as DurationValue;
}

function isValidFormat(value: string) {
    return Boolean(matchPattern(value));
}

function matchPattern(value: string) {
    return value.match(
        /^P(?:((?:[1-9]\d*(?:\.\d+)?)|(?:0(?:\.\d+)?))Y)?(?:((?:[1-9]\d*(?:\.\d+)?)|(?:0(?:\.\d+)?))M)?(?:((?:[1-9]\d*(?:\.\d+)?)|(?:0(?:\.\d+)?))D)?(?:T(?:((?:[1-9]\d*(?:\.\d+)?)|(?:0(?:\.\d+)?))H)?(?:((?:[1-9]\d*(?:\.\d+)?)|(?:0(?:\.\d+)?))M)?(?:((?:[1-9]\d*(?:\.\d+)?)|(?:0(?:\.\d+)?))S)?)?$/
    );
}
