import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { expect, test } from 'vitest';

type Type = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any): {
        value: unknown;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nullable: (value: any) => {
        value: unknown;
    };
};

export function nullableTests<TType extends Type>(options: {
    type: TType;
    validValue: unknown;
    invalidValue: unknown;
}) {
    const { type, validValue, invalidValue } = options;

    test('It allows null when nullable is true', () => {
        for (const instance of [
            new type(validValue, { nullable: true }),
            type.nullable(validValue),
        ]) {
            expect(instance.value).toBe(validValue);

            instance.value = null;
            expect(instance.value).toBe(null);

            instance.value = validValue;
            expect(instance.value).toBe(validValue);
        }
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
        for (const instance of [new type(null, { nullable: true }), type.nullable(null)]) {
            expect(instance.value).toBe(null);

            expect(() => {
                instance.value = invalidValue;
            }).toThrowError(TypeVaultValidationError);
        }
    });
}
