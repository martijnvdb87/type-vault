import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { DateOnly } from '@/types/dateOnly.js';
import { DateOnlyValue } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('DateOnly class', () => {
    const values = [
        {
            input: '0-1-1',
            output: '0000-01-01',
        },
        {
            input: '1-1-1',
            output: '0001-01-01',
        },
        {
            input: '1000-01-01',
            output: '1000-01-01',
        },
        {
            input: '9999-12-31',
            output: '9999-12-31',
        },
        {
            input: '2000-01-01',
            output: '2000-01-01',
        },
    ] as const;

    const invalid = ['foo', '2000-13-01', '2000-01-32', '10000-01-01'] as const;

    test('It sets the correct value', () => {
        for (const { input, output } of values) {
            expect(new DateOnly(input).value).toBe(output);
        }
    });

    test('It throws an error if the value is not a supported value', () => {
        for (const value of invalid) {
            expect(() => new DateOnly(value as unknown as DateOnlyValue)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is not a string', () => {
        const values = [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new DateOnly(value as unknown as DateOnlyValue)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is not a valid date', () => {
        expect(() => new DateOnly('foo' as unknown as DateOnlyValue)).toThrowError(
            TypeVaultValidationError
        );
    });

    test('It return a Date instance', () => {
        for (const { input, output } of values) {
            const date = new DateOnly(input).toDate();
            expect(date instanceof Date).toBe(true);
            expect(date.toISOString()).toBe(`${output}T00:00:00.000Z`);
        }

        const nullable = DateOnly.nullable().toDate();
        expect(nullable).toBeNull();
    });

    test('It return DateOnly from Date', () => {
        for (const { output } of values) {
            const date = new Date(output);
            const instance = DateOnly.fromDate(date);
            expect(instance instanceof DateOnly).toBe(true);
            expect(instance.value).toBe(output);
        }
    });

    for (const { output: validValue } of values) {
        valueTests({ type: DateOnly, validValue });
        nullableTests({ type: DateOnly, validValue, invalidValue: 'not-valid' });
        immutableTests({ type: DateOnly, validValue });
    }
});
