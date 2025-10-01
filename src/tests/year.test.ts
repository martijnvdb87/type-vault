import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Year } from '@/types/year.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('Year class', () => {
    {
        const values = [
            0,
            9999,
            2000,
            6000,
            Number(0),
            Number(9999),
            Number(2000),
            Number(6000),
            10_000 - 1,
            -1 + 1,
        ];

        test('It sets the correct value', () => {
            for (const value of values) {
                expect(new Year(value).value).toBe(value);
            }
        });
    }

    test('It throws an error when the value is out of allowed range', () => {
        const values = [-1, 10_000, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];

        for (const value of values) {
            expect(() => new Year(value)).toThrowError(TypeVaultValidationError);
        }
    });

    test('It throws an error if the value is not a number', () => {
        const values = ['foo', {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new Year(value as unknown as number)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is NaN', () => {
        expect(() => new Year(NaN)).toThrowError(TypeVaultValidationError);
        expect(() => new Year(Number.NaN)).toThrowError(TypeVaultValidationError);
    });

    test('It throws an error if the value is Infinity', () => {
        expect(() => new Year(Infinity)).toThrowError(TypeVaultValidationError);
        expect(() => new Year(-Infinity)).toThrowError(TypeVaultValidationError);
    });

    test('It does not allow value changes when immutable is true', () => {
        const year = new Year(0, { immutable: true });

        expect(() => {
            // @ts-expect-error Type error expected
            year.value = 1;
        }).toThrowError(TypeVaultValidationError);
    });

    test('It throws an error if the value is changed when immutable', () => {
        const instance = Year.immutable(0);

        expect(() => {
            // @ts-expect-error Type error expected
            instance.value = 1;
        }).toThrowError(TypeVaultValidationError);
    });

    valueTests({ type: Year, validValue: 42 });
    nullableTests({ type: Year, validValue: 42, invalidValue: 'not-valid' });
    immutableTests({ type: Year, validValue: 42 });
});
