import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { DateOnly } from '@/types/dateOnly.js';
import { DateOnlyString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('DateOnly class', () => {
    const valid = ['1000-01-01', '9999-12-31', '2000-01-01'] as const;
    const invalid = ['foo', '2000-13-01', '2000-01-32', '999-01-01', '10000-01-01'] as const;

    test('It sets the correct value', () => {
        for (const value of valid) {
            expect(new DateOnly(value).value).toBe(value);
        }
    });

    test('It throws an error if the value is not a supported date string', () => {
        for (const value of invalid) {
            expect(() => new DateOnly(value as unknown as DateOnlyString)).toThrowError(
                TypeVaultValidationError
            );
        }
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

    test('It return a Date instance', () => {
        for (const value of valid) {
            const date = new DateOnly(value).toDate();
            expect(date instanceof Date).toBe(true);
            expect(date.toISOString()).toBe(`${value}T00:00:00.000Z`);
        }

        const nullable = DateOnly.nullable().toDate();
        expect(nullable).toBeNull();
    });

    for (const validValue of valid) {
        valueTests({ type: DateOnly, validValue });
        nullableTests({ type: DateOnly, validValue, invalidValue: 'not-valid' });
        immutableTests({ type: DateOnly, validValue });
    }
});
