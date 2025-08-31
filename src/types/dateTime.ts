import { Timezone } from '@/enum/timezone.js';
import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import {
    Date as DateType,
    Hour,
    Millisecond,
    Minute,
    Month,
    Second,
    UtcDateTimeString,
    Year,
} from '@/utils/types.js';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport.js';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import { BaseString } from './baseString.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(objectSupport);

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

    public set millisecond(value: number) {
        this.value = dayjs(this.value)
            .tz(this.timezone)
            .millisecond(value)
            .toISOString() as UtcDateTimeString;
    }

    public get second(): number {
        return dayjs(this.value).tz(this.timezone).second();
    }

    public set second(value: number) {
        this.value = dayjs(this.value)
            .tz(this.timezone)
            .second(value)
            .toISOString() as UtcDateTimeString;
    }

    public get minute(): number {
        return dayjs(this.value).tz(this.timezone).minute();
    }

    public set minute(value: number) {
        this.value = dayjs(this.value)
            .tz(this.timezone)
            .minute(value)
            .toISOString() as UtcDateTimeString;
    }

    public get hour(): number {
        return dayjs(this.value).tz(this.timezone).hour();
    }

    public set hour(value: number) {
        this.value = dayjs(this.value)
            .tz(this.timezone)
            .hour(value)
            .toISOString() as UtcDateTimeString;
    }

    public get date(): number {
        return dayjs(this.value).tz(this.timezone).date();
    }

    public set date(value: number) {
        this.value = dayjs(this.value)
            .tz(this.timezone)
            .date(value)
            .toISOString() as UtcDateTimeString;
    }

    public get month(): number {
        return dayjs(this.value).tz(this.timezone).month();
    }

    public set month(value: number) {
        this.value = dayjs(this.value)
            .tz(this.timezone)
            .month(value)
            .toISOString() as UtcDateTimeString;
    }

    public get year(): number {
        return dayjs(this.value).tz(this.timezone).year();
    }

    public set year(value: number) {
        this.value = dayjs(this.value)
            .tz(this.timezone)
            .year(value)
            .toISOString() as UtcDateTimeString;
    }

    public get day(): number {
        return dayjs(this.value).tz(this.timezone).day();
    }

    public get daysInMonth(): number {
        return dayjs(this.value).tz(this.timezone).daysInMonth();
    }

    public set(options: {
        year?: Year;
        month?: Month;
        date?: DateType;
        hour?: Hour;
        minute?: Minute;
        second?: Second;
        millisecond?: Millisecond;
        timezone?: Timezone;
    }) {
        const setObject = Object.entries(options).reduce(
            (acc, [key, value]) => {
                if (value !== undefined && key !== 'timezone') {
                    acc[key] = value;
                }

                return acc;
            },
            {} as Record<string, unknown>
        );

        this.timezone = options.timezone ?? this.timezone;
        const value = dayjs(this.value).tz(this.timezone).set(setObject);

        this.value = value.toISOString() as UtcDateTimeString;
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

    public static fromObject(options: {
        year: Year;
        month?: Month;
        date?: DateType;
        hour?: Hour;
        minute?: Minute;
        second?: Second;
        millisecond?: Millisecond;
        timezone?: Timezone;
    }) {
        const dateTime = new DateTime();

        dateTime.timezone = options.timezone ?? dateTime.timezone;

        dateTime.set({
            year: options.year,
            month: options.month ?? 0,
            date: options.date ?? 0,
            hour: options.hour ?? 0,
            minute: options.minute ?? 0,
            second: options.second ?? 0,
            millisecond: options.millisecond ?? 0,
        });

        return dateTime;
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
