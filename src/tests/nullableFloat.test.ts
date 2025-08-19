import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { NullableFloat } from '@/types/nullableFloat.js';
import { describe, expect, test } from 'vitest';

describe('NullableFloat class', () => {
    test('It sets the default value to 0', () => {
        expect(new NullableFloat().value).toBe(null);
    });

    test('It sets the correct value', () => {
        const values = [null, Number.MIN_SAFE_INTEGER, -99 - 1, 0, 1, 99, Number.MAX_SAFE_INTEGER];

        for (const value of values) {
            expect(new NullableFloat(new NullableFloat(value)).value).toBe(value);
        }
    });

    test('It sets the correct value', () => {
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

        for (const value of values) {
            expect(new NullableFloat(value).value).toBe(value);
        }
    });

    test('It throws an error when the value is out of allowed range', () => {
        const values = [Number.MIN_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER + 1];

        for (const value of values) {
            expect(() => new NullableFloat(value)).toThrowError(TypeVaultValidationError);
        }
    });

    test('It throws an error if the value is not a number', () => {
        const values = ['foo', {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new NullableFloat(value as unknown as number)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is NaN', () => {
        expect(() => new NullableFloat(NaN)).toThrowError(TypeVaultValidationError);
        expect(() => new NullableFloat(Number.NaN)).toThrowError(TypeVaultValidationError);
    });

    test('It throws an error if the value is Infinity', () => {
        expect(() => new NullableFloat(Infinity)).toThrowError(TypeVaultValidationError);
        expect(() => new NullableFloat(-Infinity)).toThrowError(TypeVaultValidationError);
    });

    test('It returns a string when toString is called', () => {
        expect(new NullableFloat().toString()).toBe('');
        expect(new NullableFloat(1.1).toString()).toBe('1.1');
    });

    test('It returns a number when valueOf is called', () => {
        expect(new NullableFloat().valueOf()).toBe(null);
        expect(new NullableFloat(1.1).valueOf()).toBe(1.1);
    });

    test('It returns a number when toJSON is called', () => {
        expect(new NullableFloat().toJSON()).toBe(null);
        expect(new NullableFloat(1.1).toJSON()).toBe(1.1);
    });
});
