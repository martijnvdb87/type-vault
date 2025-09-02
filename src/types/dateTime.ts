import { DateTimeUnit } from '@/enum/dateTimeUnit.js';
import { Timezone } from '@/enum/timezone.js';
import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import {
    DateTimeString,
    Date as DateType,
    Hour,
    Millisecond,
    Minute,
    Month,
    Second,
    Year,
} from '@/utils/types.js';
import dayjs, { UnitType } from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import objectSupport from 'dayjs/plugin/objectSupport.js';
import quarterOfYear from 'dayjs/plugin/quarterOfYear.js';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import { BaseString } from './baseString.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(objectSupport);
dayjs.extend(quarterOfYear);
dayjs.extend(duration);

type DateTimeManipulateOptions = {
    year: Year;
    month: Month;
    day: DateType;
    hour: Hour;
    minute: Minute;
    second: Second;
    millisecond: Millisecond;
};

type DateTimeSetOptions = {
    year: Year;
    month: Month;
    date: DateType;
    hour: Hour;
    minute: Minute;
    second: Second;
    millisecond: Millisecond;
    timezone: Timezone;
};

export class DateTime extends BaseString<DateTimeString> {
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
            .toISOString() as DateTimeString;
    }

    public get second(): number {
        return dayjs(this.value).tz(this.timezone).second();
    }

    public set second(value: number) {
        this.value = dayjs(this.value)
            .tz(this.timezone)
            .second(value)
            .toISOString() as DateTimeString;
    }

    public get minute(): number {
        return dayjs(this.value).tz(this.timezone).minute();
    }

    public set minute(value: number) {
        this.value = dayjs(this.value)
            .tz(this.timezone)
            .minute(value)
            .toISOString() as DateTimeString;
    }

    public get hour(): number {
        return dayjs(this.value).tz(this.timezone).hour();
    }

    public set hour(value: number) {
        this.value = dayjs(this.value)
            .tz(this.timezone)
            .hour(value)
            .toISOString() as DateTimeString;
    }

    public get date(): number {
        return dayjs(this.value).tz(this.timezone).date();
    }

    public set date(value: number) {
        this.value = dayjs(this.value)
            .tz(this.timezone)
            .date(value)
            .toISOString() as DateTimeString;
    }

    public get month(): number {
        return dayjs(this.value).tz(this.timezone).month();
    }

    public set month(value: number) {
        this.value = dayjs(this.value)
            .tz(this.timezone)
            .month(value)
            .toISOString() as DateTimeString;
    }

    public get year(): number {
        return dayjs(this.value).tz(this.timezone).year();
    }

    public set year(value: number) {
        this.value = dayjs(this.value)
            .tz(this.timezone)
            .year(value)
            .toISOString() as DateTimeString;
    }

    public get day(): number {
        return dayjs(this.value).tz(this.timezone).day();
    }

    public get daysInMonth(): number {
        return dayjs(this.value).tz(this.timezone).daysInMonth();
    }

    public set(options: Partial<DateTimeSetOptions>) {
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

        this.value = value.toISOString() as DateTimeString;
    }

    public add(options: Partial<DateTimeManipulateOptions>) {
        const addObject = Object.entries(options).reduce(
            (acc, [key, value]) => {
                if (value !== undefined) {
                    acc[key] = value;
                }

                return acc;
            },
            {} as Record<string, unknown>
        );

        this.value = dayjs(this.value)
            .tz(this.timezone)
            .add(dayjs.duration(addObject))
            .toISOString() as DateTimeString;
    }

    public subtract(options: Partial<DateTimeManipulateOptions>) {
        this.value = dayjs(this.value)
            .tz(this.timezone)
            .subtract(options)
            .toISOString() as DateTimeString;
    }

    public format(format: string): string {
        if (!this.value) {
            throw new TypeVaultValidationError();
        }

        return dayjs(this.value).tz(this.timezone).format(format);
    }

    public difference(date: DateTime, unit: DateTimeUnit): number {
        return dayjs(this.value)
            .tz(this.timezone)
            .diff(date.value, unit as UnitType);
    }

    protected default() {
        return dayjs().tz(this.timezone).toISOString() as DateTimeString;
    }

    protected modifier(value: unknown) {
        return modifier(value) as DateTimeString;
    }

    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        if (!value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3})?Z$/)) {
            return false;
        }

        return dayjs(value).isValid();
    }

    public static now(): DateTime {
        return new DateTime(dayjs().toISOString() as DateTimeString);
    }

    public static fromObject(
        options: Partial<Omit<DateTimeSetOptions, 'year'>> & Pick<DateTimeSetOptions, 'year'>
    ) {
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

    public static startOf(date: DateTime, unit: DateTimeUnit) {
        const value = dayjs(date.value)
            .tz(date.timezone)
            .startOf(unit as UnitType);

        return new DateTime(value.toISOString() as DateTimeString);
    }

    public static endOf(date: DateTime, unit: DateTimeUnit) {
        const value = dayjs(date.value)
            .tz(date.timezone)
            .endOf(unit as UnitType);

        return new DateTime(value.toISOString() as DateTimeString);
    }
}

function modifier(value: unknown): string {
    if (value instanceof DateTime) {
        value = value.value;
    }

    return value as string;
}
