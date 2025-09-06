import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Integer } from '@/types/integer.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';

describe('Integer class', () => {
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
        const values = ['foo', {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

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

    test('It returns a string when toString is called', () => {
        expect(new Integer(0).toString()).toBe('0');
        expect(new Integer(1).toString()).toBe('1');
    });

    test('It returns a number when valueOf is called', () => {
        expect(new Integer(0).valueOf()).toBe(0);
        expect(new Integer(1).valueOf()).toBe(1);
    });

    test('It returns a number when toJSON is called', () => {
        expect(new Integer(0).toJSON()).toBe(0);
        expect(new Integer(1).toJSON()).toBe(1);
    });

    test('It does not allow value changes when immutable is true', () => {
        const integer = new Integer(0, { immutable: true });

        expect(() => {
            // @ts-expect-error Type error expected
            integer.value = 1;
        }).toThrowError(TypeVaultValidationError);
    });

    test('It throws an error if the value is changed when immutable', () => {
        const instance = Integer.immutable(0);

        expect(() => {
            // @ts-expect-error Type error expected
            instance.value = 1;
        }).toThrowError(TypeVaultValidationError);
    });

    nullableTests({ type: Integer, validValue: 42, invalidValue: 'not-valid' });
    immutableTests({ type: Integer, validValue: 42 });
});
