import dayjs from 'dayjs';
import { BaseString } from './baseString.js';

export class DateTime extends BaseString {
    public constructor(value: DateTime | string | Date | void) {
        super(modifier(value));
    }

    public toDate(): Date {
        return dayjs(this.value).toDate();
    }

    protected default(): string {
        return dayjs().toISOString();
    }

    protected modifier(value: unknown): string {
        return modifier(value);
    }

    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        return dayjs(value).isValid();
    }

    public static now(): DateTime {
        return new DateTime(dayjs().toISOString());
    }
}

function modifier(value: unknown): string {
    if (value instanceof Date) {
        value = dayjs(value).toISOString();
    }

    if (value instanceof DateTime) {
        value = value.value;
    }

    return value as string;
}
