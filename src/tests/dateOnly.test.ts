import { DateTimeUnit } from '@/enum/dateTimeUnit.js';
import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { DateOnly } from '@/types/dateOnly.js';
import { DateOnlyString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { nullableTests } from './utils/nullableTests.js';

describe('DateOnly class', () => {
    test('It sets the correct now value', () => {
        const { value } = DateOnly.now();

        const dateOnly = new DateOnly(value);

        expect(dateOnly.value).toBe(value);
    });

    test('It sets the correct value', () => {
        const value = '2022-01-01';

        const dateOnly = new DateOnly(value);

        expect(dateOnly.value).toBe(value);
    });

    test('It throws an error if the value is not a string', () => {
        const values = [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new DateOnly(value as unknown as DateOnlyString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is not a valid date', () => {
        expect(() => new DateOnly('foo' as unknown as DateOnlyString)).toThrowError(
            TypeVaultValidationError
        );
    });

    test('It returns the correct values', () => {
        const value = '2023-01-02';
        const dateOnly = new DateOnly(value);

        expect(dateOnly.date).toBe(2);
        expect(dateOnly.month).toBe(0);
        expect(dateOnly.year).toBe(2023);
    });

    test('It updates the value', () => {
        const value = '2023-01-02';
        const dateOnly = new DateOnly(value);

        expect(dateOnly.date).toBe(2);
        expect(dateOnly.month).toBe(0);
        expect(dateOnly.year).toBe(2023);

        dateOnly.value = '2024-02-03';
        expect(dateOnly.date).toBe(3);
        expect(dateOnly.month).toBe(1);
        expect(dateOnly.year).toBe(2024);
    });

    test('It updates the date/time properties', () => {
        const value = '2023-01-02';
        const dateOnly = new DateOnly(value);

        dateOnly.date = 3;
        dateOnly.month = 2;
        dateOnly.year = 2024;

        expect(dateOnly.date).toBe(3);
        expect(dateOnly.month).toBe(2);
        expect(dateOnly.year).toBe(2024);
    });

    test('It sets using an object', () => {
        const value = '2023-01-02';
        const dateOnly = new DateOnly(value);

        dateOnly.set({ date: 3, month: 2, year: 2024 });

        expect(dateOnly.date).toBe(3);
        expect(dateOnly.month).toBe(2);
        expect(dateOnly.year).toBe(2024);
    });

    test('It creates a DateTime object from an object', () => {
        const dateOnly = DateOnly.fromObject({
            year: 2023,
            month: 0,
            date: 2,
        });

        expect(dateOnly.value).toBe('2023-01-02');
    });

    test('It adds to the date/time', () => {
        const value = '2023-01-02';
        const dateOnly = new DateOnly(value);

        dateOnly.add({ day: 1, month: 1, year: 1 });

        expect(dateOnly.date).toBe(3);
        expect(dateOnly.month).toBe(1);
        expect(dateOnly.year).toBe(2024);
    });

    test('It subtracts from the date/time', () => {
        const value = '2023-01-02';
        const dateOnly = new DateOnly(value);

        dateOnly.subtract({ day: 1, month: 1, year: 1 });

        expect(dateOnly.date).toBe(1);
        expect(dateOnly.month).toBe(11);
        expect(dateOnly.year).toBe(2021);
    });

    test('It formats the date/time', () => {
        const value = '2023-01-02';
        const dateOnly = new DateOnly(value);

        expect(dateOnly.format('YYYY-MM-DD')).toBe('2023-01-02');
        expect(dateOnly.format('D-M-YY')).toBe('2-1-23');
    });

    test('It returns the difference', () => {
        const value = '2023-01-02';
        const dateOnly = new DateOnly(value);

        expect(dateOnly.difference(new DateOnly('2023-01-01'), DateTimeUnit.Day)).toBe(1);
        expect(dateOnly.difference(new DateOnly('2023-05-02'), DateTimeUnit.Month)).toBe(-4);
        expect(dateOnly.difference(new DateOnly('2020-01-02'), DateTimeUnit.Year)).toBe(3);
    });

    nullableTests({ type: DateOnly, validValue: '2023-01-01', invalidValue: 'not-valid' });
});
