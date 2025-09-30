import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { DateTime } from '@/types/dateTime.js';
import { DateTimeString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('DateTime class', () => {
    const values = [
        {
            input: '2023-01-02T01:23:45.123Z',
            output: '2023-01-02T01:23:45.123Z',
        },
        {
            input: '2023-01-02T01:23:45Z',
            output: '2023-01-02T01:23:45.000Z',
        },
        {
            input: '1000-01-01T00:00:00.000Z',
            output: '1000-01-01T00:00:00.000Z',
        },
        {
            input: '9999-12-31T23:59:59.999Z',
            output: '9999-12-31T23:59:59.999Z',
        },
    ] as const;

    test('It sets the correct value', () => {
        for (const { input, output } of values) {
            expect(new DateTime(input).value).toBe(output);
        }
    });

    test('It throws an error if the value is not a supported date string', () => {
        for (const value of [
            '2023-01-02',
            '2023-01-02T01:23:45',
            '2023-01-02T01:23:45.123',
            '999-12-31T23:59:59.999Z',
            '10000-01-01T01:00:00.000Z',
            '2000-13-31T23:59:59.999Z',
        ]) {
            expect(() => new DateTime(value as unknown as DateTimeString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is not a string', () => {
        for (const value of [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)]) {
            expect(() => new DateTime(value as unknown as DateTimeString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is not a valid date', () => {
        expect(() => new DateTime('foo' as unknown as DateTimeString)).toThrowError(
            TypeVaultValidationError
        );
    });

    test('It updates the value', () => {
        const value = '2023-01-02T01:23:45.123Z';
        const dateTime = new DateTime(value);

        expect(dateTime.value).toBe(value);

        dateTime.value = '2024-02-03T02:34:51.234Z';
        expect(dateTime.value).toBe('2024-02-03T02:34:51.234Z');
    });

    test('It return a Date instance', () => {
        for (const { input, output } of values) {
            const date = new DateTime(input).toDate();
            expect(date instanceof Date).toBe(true);
            expect(date.toISOString()).toBe(output);
        }

        const nullable = DateTime.nullable().toDate();
        expect(nullable).toBeNull();
    });

    test('It return DateTime from Date', () => {
        for (const { input, output } of values) {
            const date = new Date(input);
            const instance = DateTime.fromDate(date);
            expect(instance instanceof DateTime).toBe(true);
            expect(instance.value).toBe(output);
        }
    });

    for (const validValue of values.map(({ output }) => output)) {
        valueTests({ type: DateTime, validValue });
        nullableTests({
            type: DateTime,
            validValue,
            invalidValue: 'not-valid',
        });
        immutableTests({ type: DateTime, validValue });
    }
});
