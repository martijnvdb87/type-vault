import { DateTimeUnit } from '@/enum/dateTimeUnit.js';
import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { TimeOnlyString } from '@/utils/types.js';
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

type TimeOnlySetOptions = {
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
};

type TimeOnlyManipulateOptions = {
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
};

export class TimeOnly extends BaseString<TimeOnlyString> {
    public get millisecond(): number {
        return withDummyDate(this.value).millisecond();
    }

    public set millisecond(value: number) {
        this.value = withDummyDate(this.value)
            .millisecond(value)
            .format('HH:mm:ss.SSS') as TimeOnlyString;
    }

    public get second(): number {
        return withDummyDate(this.value).second();
    }

    public set second(value: number) {
        this.value = withDummyDate(this.value)
            .second(value)
            .format('HH:mm:ss.SSS') as TimeOnlyString;
    }

    public get minute(): number {
        return withDummyDate(this.value).minute();
    }

    public set minute(value: number) {
        this.value = withDummyDate(this.value)
            .minute(value)
            .format('HH:mm:ss.SSS') as TimeOnlyString;
    }

    public get hour(): number {
        return withDummyDate(this.value).hour();
    }

    public set hour(value: number) {
        this.value = withDummyDate(this.value).hour(value).format('HH:mm:ss.SSS') as TimeOnlyString;
    }

    public set(options: Partial<TimeOnlySetOptions>) {
        const setObject = Object.entries(options).reduce(
            (acc, [key, value]) => {
                if (value !== undefined) {
                    acc[key] = value;
                }

                return acc;
            },
            {} as Record<string, unknown>
        );

        const value = withDummyDate(this.value).set(setObject);

        this.value = value.format('HH:mm:ss.SSS') as TimeOnlyString;
    }

    public add(options: Partial<TimeOnlyManipulateOptions>) {
        const addObject = Object.entries(options).reduce(
            (acc, [key, value]) => {
                if (value !== undefined) {
                    acc[key] = value;
                }

                return acc;
            },
            {} as Record<string, unknown>
        );

        this.value = withDummyDate(this.value)
            .add(dayjs.duration(addObject))
            .format('HH:mm:ss.SSS') as TimeOnlyString;
    }

    public subtract(options: Partial<TimeOnlyManipulateOptions>) {
        this.value = withDummyDate(this.value)
            .subtract(options)
            .format('HH:mm:ss.SSS') as TimeOnlyString;
    }

    public format(format: string): string {
        if (!this.value) {
            throw new TypeVaultValidationError();
        }

        return withDummyDate(this.value).format(format);
    }

    public difference(time: TimeOnly, unit: DateTimeUnit): number {
        return withDummyDate(this.value).diff(withDummyDate(time.value), unit as UnitType);
    }

    protected modifier(value: unknown) {
        return modifier(value) as TimeOnlyString;
    }

    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        return Boolean(value.match(/^\d{2}:\d{2}:\d{2}(.\d{3})?$/));
    }

    public static now(): TimeOnly {
        return new TimeOnly(dayjs().format('HH:mm:ss.SSS') as TimeOnlyString);
    }

    public static fromObject(options: Partial<TimeOnlySetOptions>) {
        const dateTime = TimeOnly.now();

        dateTime.set({
            hour: options.hour ?? 0,
            minute: options.minute ?? 0,
            second: options.second ?? 0,
            millisecond: options.millisecond ?? 0,
        });

        return dateTime;
    }
}

function modifier(value: unknown): string {
    if (value instanceof TimeOnly) {
        value = value.value;
    }

    return value as string;
}

function withDummyDate(value: TimeOnlyString) {
    return dayjs(`1900-01-01T${value}`);
}
