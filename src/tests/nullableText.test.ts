import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { NullableText } from '@/types/nullableText.js';
import { describe, expect, test } from 'vitest';

describe('NullableText class', () => {
    test('It sets the default value to null', () => {
        expect(new NullableText().value).toBe(null);
    });

    test('It sets the correct value', () => {
        expect(new NullableText('foo').value).toBe('foo');
    });

    test('It throws an error if the value is not a string', () => {
        const values = [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new NullableText(value as unknown as string)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It returns a string when toString is called', () => {
        expect(new NullableText().toString()).toBe('');
        expect(new NullableText('foo').toString()).toBe('foo');
    });

    test('It returns a JSON value when toJSON is called', () => {
        expect(new NullableText().toJSON()).toBe(null);
        expect(new NullableText('foo').toJSON()).toBe('foo');
    });

    test('It returns the value when valueOf is called', () => {
        expect(new NullableText().valueOf()).toBe(null);
        expect(new NullableText('foo').valueOf()).toBe('foo');
    });
});
