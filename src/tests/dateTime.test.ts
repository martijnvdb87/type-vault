import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { DateTime } from '@/types/dateTime.js';
import { describe, expect, test } from 'vitest';

describe('DateTime class', () => {
    test('It sets the default value', () => {
        const value = DateTime.now();

        const dateTime = new DateTime(value);

        expect(dateTime.value).toBe(value.value);
    });

    test('It sets the correct value', () => {
        const value = '2022-01-01T00:00:00.000Z';

        const dateTime = new DateTime(value);

        expect(dateTime.value).toBe(value);
    });

    test('It throws an error if the value is not a string', () => {
        const values = [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new DateTime(value as unknown as string)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is not a valid date', () => {
        expect(() => new DateTime('foo')).toThrowError(TypeVaultValidationError);
    });
});
