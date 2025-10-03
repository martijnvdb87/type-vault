import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Percentage } from '@/types/percentage.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('Percentage class', () => {
    const values = [
        0, 1, 0.5, 0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001, 0.0000001, 0.9, 0.99, 0.999, 0.9999,
        0.99999, 0.999999,
    ] as const;

    test('It sets the correct value', () => {
        for (const value of values) {
            expect(new Percentage(value).value).toBe(value);
        }
    });

    test('It throws an error when the value is out of allowed range', () => {
        const values = [-1, 2, -0.1, 1.1];

        for (const value of values) {
            expect(() => new Percentage(value)).toThrowError(TypeVaultValidationError);
        }
    });

    test('It throws an error if the value is not a number', () => {
        const values = ['foo', {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new Percentage(value as unknown as number)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is NaN', () => {
        expect(() => new Percentage(NaN)).toThrowError(TypeVaultValidationError);
        expect(() => new Percentage(Number.NaN)).toThrowError(TypeVaultValidationError);
    });

    test('It throws an error if the value is Infinity', () => {
        expect(() => new Percentage(Infinity)).toThrowError(TypeVaultValidationError);
        expect(() => new Percentage(-Infinity)).toThrowError(TypeVaultValidationError);
    });

    for (const validValue of values) {
        valueTests({ type: Percentage, validValue });
        nullableTests({
            type: Percentage,
            validValue,
            invalidValue: 'not-valid',
        });
        immutableTests({ type: Percentage, validValue });
    }
});
