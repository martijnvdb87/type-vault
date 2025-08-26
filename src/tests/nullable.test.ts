import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Integer } from '@/types/integer.js';
import { Nullable } from '@/utils/nullable.js';
import { describe, expect, test } from 'vitest';

describe('Nullable function', () => {
    test('It expects instance of Integer', () => {
        const nullable = Nullable(new Integer());

        expect(nullable instanceof Integer).toBeTruthy();
    });

    test('It sets the default value to null', () => {
        const nullable = Nullable(new Integer());

        expect(nullable.value).toBe(null);
    });

    test('It does not overwrite the value when the default value is set', () => {
        const nullable = Nullable(new Integer(0));

        expect(nullable.value).toBe(0);
    });

    test('It allows to set the value to null', () => {
        const nullable = Nullable(new Integer(1));
        nullable.value = null;

        expect(nullable.value).toBe(null);
    });

    test('It sets the default value to null', () => {
        const integer = new Integer(1);

        integer.value = null as unknown as number;
        expect(integer.value).toBe(0);
    });

    test('It throws an error if the value is not a number', () => {
        const nullable = Nullable(new Integer(1));

        expect(() => {
            nullable.value = 'foo' as unknown as number;
        }).toThrowError(TypeVaultValidationError);
    });
});
