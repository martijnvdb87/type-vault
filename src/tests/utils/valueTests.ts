import { InvalidTypeError } from '@/errors/invalidTypeError.js';
import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { expect, test } from 'vitest';

type Type = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any): {
        value: unknown;
        equals(other: unknown): boolean;
        assertEquals(other: unknown): void;
        toJSON(): unknown;
    };
    isValid(value: unknown): boolean;
};

export function valueTests<TType extends Type>(options: { type: TType; validValue: unknown }) {
    const { type, validValue } = options;

    test('It returns a string when toString is called', () => {
        expect(new type(validValue).toString()).toBe(String(validValue));
    });

    test('It returns a number when valueOf is called', () => {
        expect(new type(validValue).valueOf()).toBe(validValue);
    });

    test('It returns a number when toJSON is called', () => {
        expect(new type(validValue).toJSON()).toBe(validValue);
    });

    test('It returns true when equals is called with the same typed value', () => {
        expect(new type(validValue).equals(new type(validValue))).toBe(true);
    });

    test('It returns false when equals is called with a different value', () => {
        expect(new type(validValue).equals(null)).toBe(false);
    });

    test('It does not throw when assertEquals is called with the same typed value', () => {
        expect(() => new type(validValue).assertEquals(new type(validValue))).not.toThrow();
    });

    test('It throws when assertEquals is called with a different value', () => {
        expect(() => new type(validValue).assertEquals(null)).toThrowError(
            TypeVaultValidationError
        );
    });

    test('It returns true when isValid is called with a supported value', () => {
        expect(type.isValid(validValue)).toBe(true);
    });

    test('It returns false when isValid is called with null', () => {
        expect(type.isValid(null)).toBe(false);
        expect(() => new type(null)).toThrowError(InvalidTypeError);
    });
}
