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

    test('It returns the correct values', () => {
        const value = '2023-01-02T01:23:45.123Z';
        const dateTime = new DateTime(value);

        expect(dateTime.timezone).toBe(Timezone.UTC);

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
});
