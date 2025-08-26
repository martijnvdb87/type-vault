import dayjs from 'dayjs';
import { BaseString } from './baseString.js';

export class DateTime extends BaseString {
    public constructor(value: DateTime | string | Date | void) {
        if (value instanceof Date) {
            value = dayjs(value).toISOString();
        }

        if (value instanceof DateTime) {
            value = value.value;
        }

        super(String(value));
    }

    protected default(): string {
        return dayjs().toISOString();
    }

    protected modifier(value: unknown): string {
        if (value instanceof Date) {
            value = dayjs(value).toISOString();
        }

        if (value instanceof DateTime) {
            value = value.value;
        }

        return String(value);
    }

    public static now(): DateTime {
        return new DateTime(dayjs().toISOString());
    }
}
