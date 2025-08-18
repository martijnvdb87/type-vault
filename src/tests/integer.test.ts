import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Integer } from '@/types/integer.js';
import { expect, describe, test } from 'vitest';

describe('Integer class', () => {
    test('It sets the default value to 0', () => {
        expect(new Integer().value).toBe(0);
    });

    {
        const values = [
            Number.MIN_SAFE_INTEGER,
            -99 - 1,
            0,
            1,
            99,
            Number.MAX_SAFE_INTEGER,
            Number(Number.MIN_SAFE_INTEGER),
            Number(-99),
            Number(-1),
            Number(0),
            Number(1),
            Number(99),
            Number(Number.MAX_SAFE_INTEGER),
        ];

        test('It sets the correct value from Integer', () => {
            for (const value of values) {
                expect(new Integer(new Integer(value)).value).toBe(value);
            }
        });

        test('It sets the correct value', () => {
            for (const value of values) {
                expect(new Integer(value).value).toBe(value);
            }
        });
    }

    test('It throws an error when the value is out of allowed range', () => {
        const values = [Number.MIN_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER + 1];

        for (const value of values) {
            expect(() => new Integer(value)).toThrowError(TypeVaultValidationError);
        }
    });

    test('It throws an error if the value is not a number', () => {
        const values = ['foo', {}, null, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new Integer(value as unknown as number)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is NaN', () => {
        expect(() => new Integer(NaN)).toThrowError(TypeVaultValidationError);
        expect(() => new Integer(Number.NaN)).toThrowError(TypeVaultValidationError);
    });

    test('It throws an error if the value is Infinity', () => {
        expect(() => new Integer(Infinity)).toThrowError(TypeVaultValidationError);
        expect(() => new Integer(-Infinity)).toThrowError(TypeVaultValidationError);
    });

    test('It floors the value', () => {
        const values = [
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
        ];

        for (const value of values) {
            expect(new Integer(value).value).toBe(Math.floor(value));
        }
    });
});
