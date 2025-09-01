import { DateTimeUnit } from '@/enum/dateTimeUnit.js';
import { Timezone } from '@/enum/timezone.js';
import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { DateTime } from '@/types/dateTime.js';
import { UtcDateTimeString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';

describe('DateTime class', () => {
    test('It sets the default value', () => {
        const { value } = DateTime.now();

        const dateTime = new DateTime(value);

        expect(dateTime.value).toBe(value);
    });

    test('It sets the correct value', () => {
        const value = '2022-01-01T00:00:00.000Z';

        const dateTime = new DateTime(value);

        expect(dateTime.value).toBe(value);
    });

    test('It throws an error if the value is not a string', () => {
        const values = [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new DateTime(value as unknown as UtcDateTimeString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is not a valid date', () => {
        expect(() => new DateTime('foo' as unknown as UtcDateTimeString)).toThrowError(
            TypeVaultValidationError
        );
    });

    test('It returns the correct values', () => {
        const value = '2023-01-02T01:23:45.123Z';
        const dateTime = new DateTime(value);

        expect(dateTime.millisecond).toBe(123);
        expect(dateTime.second).toBe(45);
        expect(dateTime.minute).toBe(23);
        expect(dateTime.hour).toBe(1);
        expect(dateTime.date).toBe(2);
        expect(dateTime.month).toBe(0);
        expect(dateTime.year).toBe(2023);
        expect(dateTime.day).toBe(1);
        expect(dateTime.daysInMonth).toBe(31);
    });

    test('It changes the timezone', () => {
        const value = '2023-01-02T01:23:45.123Z';
        const dateTime = new DateTime(value);

        expect(dateTime.timezone).toBe(Timezone.UTC);
        expect(dateTime.date).toBe(2);
        expect(dateTime.hour).toBe(1);

        dateTime.timezone = Timezone.Europe_Amsterdam;
        expect(dateTime.timezone).toBe(Timezone.Europe_Amsterdam);
        expect(dateTime.date).toBe(2);
        expect(dateTime.hour).toBe(2);

        dateTime.timezone = Timezone.America_NewYork;
        expect(dateTime.timezone).toBe(Timezone.America_NewYork);
        expect(dateTime.date).toBe(1);
        expect(dateTime.hour).toBe(20);

        dateTime.timezone = Timezone.UTC;
        expect(dateTime.timezone).toBe(Timezone.UTC);
        expect(dateTime.date).toBe(2);
        expect(dateTime.hour).toBe(1);
    });

    test('It throws an error if the timezone is not valid', () => {
        expect(
            () => (new DateTime('2023-01-02T01:23:45.123Z').timezone = 'foo' as unknown as Timezone)
        ).toThrowError(TypeVaultValidationError);
    });

    test('It updates the value', () => {
        const value = '2023-01-02T01:23:45.123Z';
        const dateTime = new DateTime(value);

        expect(dateTime.value).toBe(value);

        dateTime.value = '2024-02-03T02:34:51.234Z';
        expect(dateTime.value).toBe('2024-02-03T02:34:51.234Z');
    });

    test('It updates the date/time values', () => {
        const value = '2023-01-02T01:23:45.123Z';
        const dateTime = new DateTime(value);

        expect(dateTime.millisecond).toBe(123);
        expect(dateTime.second).toBe(45);
        expect(dateTime.minute).toBe(23);
        expect(dateTime.hour).toBe(1);
        expect(dateTime.date).toBe(2);
        expect(dateTime.month).toBe(0);
        expect(dateTime.year).toBe(2023);
        expect(dateTime.day).toBe(1);
        expect(dateTime.daysInMonth).toBe(31);

        dateTime.value = '2024-02-03T02:34:51.234Z';
        expect(dateTime.millisecond).toBe(234);
        expect(dateTime.second).toBe(51);
        expect(dateTime.minute).toBe(34);
        expect(dateTime.hour).toBe(2);
        expect(dateTime.date).toBe(3);
        expect(dateTime.month).toBe(1);
        expect(dateTime.year).toBe(2024);
        expect(dateTime.day).toBe(6);
        expect(dateTime.daysInMonth).toBe(29);
    });

    test('It updates the date/time properties', () => {
        const value = '2023-01-02T01:23:45.123Z';
        const dateTime = new DateTime(value);

        dateTime.millisecond = 234;
        dateTime.second = 51;
        dateTime.minute = 34;
        dateTime.hour = 2;
        dateTime.date = 3;
        dateTime.month = 1;
        dateTime.year = 2024;

        expect(dateTime.value).toBe('2024-02-03T02:34:51.234Z');
    });

    test('It updates the date/time properties with timezone', () => {
        const value = '2023-01-02T01:23:45.123Z';
        const dateTime = new DateTime(value);

        dateTime.timezone = Timezone.America_NewYork;
        dateTime.millisecond = 234;
        dateTime.second = 51;
        dateTime.minute = 34;
        dateTime.hour = 2;
        dateTime.date = 3;
        dateTime.month = 1;
        dateTime.year = 2024;

        expect(dateTime.timezone).toBe(Timezone.America_NewYork);
        expect(dateTime.value).toBe('2024-02-03T07:34:51.234Z');
        expect(dateTime.hour).toBe(2);

        dateTime.timezone = Timezone.UTC;
        expect(dateTime.value).toBe('2024-02-03T07:34:51.234Z');
        expect(dateTime.hour).toBe(7);
    });

    test('It sets using an object', () => {
        const value = '2023-01-02T01:23:45.123Z';
        const dateTime = new DateTime(value);

        dateTime.set({
            year: 2024,
            month: 5,
            date: 8,
            hour: 6,
            minute: 19,
            second: 33,
            millisecond: 0,
        });

        expect(dateTime.value).toBe('2024-06-08T06:19:33.000Z');
    });

    test('It sets using an object', () => {
        const value = '2023-01-02T01:23:45.123Z';
        const dateTime = new DateTime(value);

        dateTime.set({
            hour: 6,
            timezone: Timezone.America_NewYork,
        });

        expect(dateTime.timezone).toBe(Timezone.America_NewYork);
        expect(dateTime.hour).toBe(6);
    });

    test('It creates a DateTime object from an object', () => {
        const dateTime = DateTime.fromObject({
            year: 2023,
            month: 0,
            date: 2,
            hour: 5,
            timezone: Timezone.America_NewYork,
        });

        expect(dateTime.value).toBe('2023-01-02T09:00:00.000Z');
        expect(dateTime.timezone).toBe(Timezone.America_NewYork);
    });

    test('It adds to the date/time', () => {
        const value = '2023-01-02T01:23:45.123Z';
        const dateTime = new DateTime(value);

        dateTime.add({ year: 1, month: 1, day: 1, hour: 1, minute: 1, second: 1, millisecond: 1 });
        expect(dateTime.value).toBe('2024-02-03T02:24:46.124Z');
    });

    test('It subtracts from the date/time', () => {
        const value = '2023-01-02T01:23:45.123Z';
        const dateTime = new DateTime(value);

        dateTime.subtract({
            year: 1,
            month: 1,
            day: 1,
            hour: 1,
            minute: 1,
            second: 1,
            millisecond: 1,
        });
        expect(dateTime.value).toBe('2021-12-01T00:22:44.122Z');
    });

    test('It formats the date/time', () => {
        const value = '2023-01-02T01:23:45.123Z';
        const dateTime = new DateTime(value);

        expect(dateTime.format('YYYY-MM-DD')).toBe('2023-01-02');
        expect(dateTime.format('YYYY-MM-DD HH:mm:ss')).toBe('2023-01-02 01:23:45');

        dateTime.timezone = Timezone.America_NewYork;

        expect(dateTime.format('YYYY-MM-DD')).toBe('2023-01-01');
        expect(dateTime.format('YYYY-MM-DD HH:mm:ss')).toBe('2023-01-01 20:23:45');
    });

    test('It returns the difference', () => {
        const value = '2023-01-02T01:23:45.123Z';
        const dateTime = new DateTime(value);

        expect(
            dateTime.difference(new DateTime('2023-01-02T01:23:45.123Z'), DateTimeUnit.Millisecond)
        ).toBe(0);

        expect(
            dateTime.difference(new DateTime('2023-01-02T01:23:45.000Z'), DateTimeUnit.Millisecond)
        ).toBe(123);

        expect(
            dateTime.difference(new DateTime('2023-01-02T01:23:46.000Z'), DateTimeUnit.Millisecond)
        ).toBe(-877);

        expect(
            dateTime.difference(new DateTime('2023-01-02T01:23:44.123Z'), DateTimeUnit.Second)
        ).toBe(1);

        expect(
            dateTime.difference(new DateTime('2023-01-02T00:23:45.123Z'), DateTimeUnit.Hour)
        ).toBe(1);

        expect(
            dateTime.difference(new DateTime('2023-01-01T01:23:45.123Z'), DateTimeUnit.Day)
        ).toBe(1);

        expect(
            dateTime.difference(new DateTime('2022-12-25T01:23:45.123Z'), DateTimeUnit.Week)
        ).toBe(1);

        expect(
            dateTime.difference(new DateTime('2022-12-02T01:23:45.123Z'), DateTimeUnit.Month)
        ).toBe(1);

        expect(
            dateTime.difference(new DateTime('2022-09-02T01:23:45.123Z'), DateTimeUnit.Quarter)
        ).toBe(1);

        expect(
            dateTime.difference(new DateTime('2022-01-02T01:23:45.123Z'), DateTimeUnit.Year)
        ).toBe(1);
    });
});
