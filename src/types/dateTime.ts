import dayjs from 'dayjs';
import { BaseString } from './baseString.js';

export class DateTime extends BaseString {
    public constructor(value: DateTime | string | Date | void) {
        super(modifier(value));
    }

    public toDate(): Date {
        return dayjs(this.value).toDate();
    }

    public get millisecond(): number {
        return dayjs(this.value).millisecond();
    }

    public get second(): number {
        return dayjs(this.value).second();
    }

    public get minute(): number {
        return dayjs(this.value).minute();
    }

    public get hour(): number {
        return dayjs(this.value).hour();
    }

    public get date(): number {
        return dayjs(this.value).date();
    }

    public get month(): number {
        return dayjs(this.value).month();
    }

    public get year(): number {
        return dayjs(this.value).year();
    }

    public get day(): number {
        return dayjs(this.value).day();
    }

    public get daysInMonth(): number {
        return dayjs(this.value).daysInMonth();
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
