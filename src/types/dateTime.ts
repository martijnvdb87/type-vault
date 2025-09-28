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

        const matches = valueString.match(
            /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:.(\d{3}))?Z/
        );

        if (!matches) {
            return valueString as DateTimeString;
        }

        const [, year, month, day, hour, minute, second, millisecond = '000'] = matches;

        return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z` as DateTimeString;
    }

    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

        if (!pattern.test(value)) {
            return false;
        }

        const date = new Date(value);

        if (date.toString() === 'Invalid Date') {
            return false;
        }

        return date.toISOString() === value;
    }

    public static nullable(value: DateTimeString | null = null) {
        return new DateTime(value, { nullable: true });
    }

    public static immutable(value: DateTimeString) {
        return new DateTime(value, { immutable: true });
    }
}
