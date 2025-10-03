import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Float } from '@/types/float.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('Float class', () => {
    const values = [
        Number.MIN_SAFE_INTEGER,
        -99 - 1,
        0,
        1,
        99,
        Number.MAX_SAFE_INTEGER,
        -2,
        -1.9,
        -1.1,
        -1,
        -0.9,
        -0.1,
        0,
        0.1,
        0.9,
        1,
        1.1,
        1.9,
        2,
        3.14159265359,
        Number(-2),
        Number(-1.9),
        Number(-1.1),
        Number(-1),
        Number(-0.9),
        Number(-0.1),
        Number(0),
        Number(0.1),
        Number(0.9),
        Number(1),
        Number(1.1),
        Number(1.9),
        Number(2),
        Number(Number.MIN_SAFE_INTEGER),
        Number(-99),
        Number(-1),
        Number(0),
        Number(1),
        Number(99),
        Number(Number.MAX_SAFE_INTEGER),
    ];

    test('It sets the correct value', () => {
        for (const value of values) {
            expect(new Float(value).value).toBe(value);
        }
    });

    test('It throws an error when the value is out of allowed range', () => {
        const values = [Number.MIN_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER + 1];

        for (const value of values) {
            expect(() => new Float(value)).toThrowError(TypeVaultValidationError);
        }
    });

    test('It throws an error if the value is not a number', () => {
        const values = ['foo', {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new Float(value as unknown as number)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is NaN', () => {
        expect(() => new Float(NaN)).toThrowError(TypeVaultValidationError);
        expect(() => new Float(Number.NaN)).toThrowError(TypeVaultValidationError);
    });

    test('It throws an error if the value is Infinity', () => {
        expect(() => new Float(Infinity)).toThrowError(TypeVaultValidationError);
        expect(() => new Float(-Infinity)).toThrowError(TypeVaultValidationError);
    });

    for (const validValue of values) {
        valueTests({ type: Float, validValue });
        nullableTests({
            type: Float,
            validValue,
            invalidValue: 'not-valid',
        });
        immutableTests({ type: Float, validValue });
    }
});
