import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { expect, test } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Type = new (...args: any) => {
    value: unknown;
};

export function nullableTests<TType extends Type>(options: {
    type: TType;
    validValue: unknown;
    invalidValue: unknown;
}) {
    const { type, validValue, invalidValue } = options;

    test('It allows null when nullable is true', () => {
        const instance = new type(validValue, { nullable: true });
        expect(instance.value).toBe(validValue);

        instance.value = null;
        expect(instance.value).toBe(null);

        instance.value = validValue;
        expect(instance.value).toBe(validValue);
    });

    test('It throws an error if the value is null when nullable is false', () => {
        expect(() => new type(null, { nullable: false })).toThrowError(TypeVaultValidationError);

        const instance = new type(validValue, { nullable: false });
        expect(instance.value).toBe(validValue);

        expect(() => {
            instance.value = null;
        }).toThrowError(TypeVaultValidationError);
    });

    test('It throws an error if the value is null when nullable is undefined', () => {
        expect(() => new type(null)).toThrowError(TypeVaultValidationError);

        expect(() => new type(null, undefined)).toThrowError(TypeVaultValidationError);
    });

    test('It does not allow invalid value for nullable', () => {
        const instance = new type(null, { nullable: true });
        expect(instance.value).toBe(null);

        expect(() => {
            instance.value = invalidValue;
        }).toThrowError(TypeVaultValidationError);
    });
}
