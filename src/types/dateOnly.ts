import { DateTimeUnit } from '@/enum/dateTimeUnit.js';
import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { DateOnlyString } from '@/utils/types.js';
import dayjs, { UnitType } from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import objectSupport from 'dayjs/plugin/objectSupport.js';
import quarterOfYear from 'dayjs/plugin/quarterOfYear.js';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import { BaseString } from './baseString.js';
import { SetTypeValue, TypeOption } from './type.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(objectSupport);
dayjs.extend(quarterOfYear);
dayjs.extend(duration);

type DateOnlySetOptions = {
    year: number;
    month: number;
    date: number;
};

type DateOnlyManipulateOptions = {
    year: number;
    month: number;
    day: number;
};

export class DateOnly<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    DateOnlyString
> {
    public get date(): number {
        return dayjs(this.value).date();
    }

    public set date(value: number) {
        this.value = dayjs(this.value).date(value).format('YYYY-MM-DD') as SetTypeValue<
            TOptions,
            DateOnlyString
        >;
    }

    public get month(): number {
        return dayjs(this.value).month();
    }

    public set month(value: number) {
        this.value = dayjs(this.value).month(value).format('YYYY-MM-DD') as SetTypeValue<
            TOptions,
            DateOnlyString
        >;
    }

    public get year(): number {
        return dayjs(this.value).year();
    }

    public set year(value: number) {
        this.value = dayjs(this.value).year(value).format('YYYY-MM-DD') as SetTypeValue<
            TOptions,
            DateOnlyString
        >;
    }

    public get day(): number {
        return dayjs(this.value).day();
    }

    public get daysInMonth(): number {
        return dayjs(this.value).daysInMonth();
    }

    public set(options: Partial<DateOnlySetOptions>) {
        const setObject = Object.entries(options).reduce(
            (acc, [key, value]) => {
                if (value !== undefined) {
                    acc[key] = value;
                }

                return acc;
            },
            {} as Record<string, unknown>
        );

        const value = dayjs(this.value).set(setObject);

        this.value = value.format('YYYY-MM-DD') as SetTypeValue<TOptions, DateOnlyString>;
    }

    public add(options: Partial<DateOnlyManipulateOptions>) {
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
            .add(dayjs.duration(addObject))
            .format('YYYY-MM-DD') as SetTypeValue<TOptions, DateOnlyString>;
    }

    public subtract(options: Partial<DateOnlyManipulateOptions>) {
        this.value = dayjs(this.value).subtract(options).format('YYYY-MM-DD') as SetTypeValue<
            TOptions,
            DateOnlyString
        >;
    }

    public format(format: string): string {
        if (!this.value) {
            throw new TypeVaultValidationError();
        }

        return dayjs(this.value).format(format);
    }

    public difference(date: DateOnly<TypeOption>, unit: DateTimeUnit): number {
        return dayjs(this.value).diff(date.value, unit as UnitType);
    }

    protected modifier(value: unknown) {
        return modifier(value) as DateOnlyString;
    }

    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return false;
        }

        return dayjs(value).isValid();
    }

    public static now(): DateOnly<TypeOption> {
        return new DateOnly(dayjs().format('YYYY-MM-DD') as DateOnlyString);
    }

    public static fromObject(
        options: Partial<Omit<DateOnlySetOptions, 'year'>> & Pick<DateOnlySetOptions, 'year'>
    ) {
        const dateTime = DateOnly.now();

        dateTime.set({
            year: options.year,
            month: options.month ?? 0,
            date: options.date ?? 0,
        });

        return dateTime;
    }

    public static nullable(value: DateOnlyString | null = null) {
        return new DateOnly(value, { nullable: true });
    }

    public static immutable(value: DateOnlyString) {
        return new DateOnly(value, { immutable: true });
    }
}

function modifier(value: unknown): string {
    if (value instanceof DateOnly) {
        value = value.value;
    }

    return value as string;
}
