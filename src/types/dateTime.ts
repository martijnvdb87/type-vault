import { Timezone } from '@/enum/timezone.js';
import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { UtcDateTimeString } from '@/utils/types.js';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import { BaseString } from './baseString.js';

dayjs.extend(utc);
dayjs.extend(timezone);

export class DateTime extends BaseString<UtcDateTimeString> {
    private _timezone: Timezone = Timezone.UTC;

    public get timezone(): Timezone {
        return this._timezone;
    }

    public set timezone(value: Timezone) {
        if (!Object.values(Timezone).includes(value)) {
            throw new TypeVaultValidationError();
        }

        this._timezone = value;
    }

    public toDate(): Date {
        return dayjs(this.value).toDate();
    }

    public get millisecond(): number {
        return dayjs(this.value).tz(this.timezone).millisecond();
    }

    public get second(): number {
        return dayjs(this.value).tz(this.timezone).second();
    }

    public get minute(): number {
        return dayjs(this.value).tz(this.timezone).minute();
    }

    public get hour(): number {
        return dayjs(this.value).tz(this.timezone).hour();
    }

    public get date(): number {
        return dayjs(this.value).tz(this.timezone).date();
    }

    public get month(): number {
        return dayjs(this.value).tz(this.timezone).month();
    }

    public get year(): number {
        return dayjs(this.value).tz(this.timezone).year();
    }

    public get day(): number {
        return dayjs(this.value).tz(this.timezone).day();
    }

    public get daysInMonth(): number {
        return dayjs(this.value).tz(this.timezone).daysInMonth();
    }

    protected default() {
        return dayjs().tz(this.timezone).toISOString() as UtcDateTimeString;
    }

    protected modifier(value: unknown) {
        return modifier(value) as UtcDateTimeString;
    }

    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        return dayjs(value).isValid();
    }

    public static now(): DateTime {
        return new DateTime(dayjs().toISOString() as UtcDateTimeString);
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
