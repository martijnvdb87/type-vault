import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { expect, test } from 'vitest';

type TypeReturnValue = {
    value: unknown;
    isImmutable: () => boolean;
};

type Type = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any): TypeReturnValue;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    immutable: (value: any) => TypeReturnValue;
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

    test('It return correct isImmutable value', () => {
        for (const instance of [
            new type(validValue, { immutable: true }),
            type.immutable(validValue),
        ]) {
            expect(instance.isImmutable()).toBe(true);
        }

        const instance = new type(validValue, { immutable: false });
        expect(instance.isImmutable()).toBe(false);
    });
}
