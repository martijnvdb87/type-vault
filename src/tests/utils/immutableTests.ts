import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { expect, test } from 'vitest';

type Type = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any): {
        value: unknown;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    immutable: (value: any) => {
        value: unknown;
    };
};

export function immutableTests<TType extends Type>(options: { type: TType; validValue: unknown }) {
    const { type, validValue } = options;

    test('It allows valid value when immutable is true', () => {
        for (const instance of [
            new type(validValue, { immutable: true }),
            type.immutable(validValue),
        ]) {
            expect(instance.value).toBe(validValue);
        }
    });

    test('It throws an error if the value is changed when immutable', () => {
        for (const instance of [
            new type(validValue, { immutable: true }),
            type.immutable(validValue),
        ]) {
            expect(() => {
                instance.value = validValue;
            }).toThrowError(TypeVaultValidationError);
        }
    });
}
