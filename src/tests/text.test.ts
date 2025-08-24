import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Text } from '@/types/text.js';
import { describe, expect, test } from 'vitest';

describe('Text class', () => {
    test("It sets the default value to ''", () => {
        expect(new Text().value).toBe('');
    });

    test('It sets the correct value', () => {
        expect(new Text('foo').value).toBe('foo');
    });

    test('It throws an error if the value is not a string', () => {
        const values = [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new Text(value as unknown as string)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It returns a string when toString is called', () => {
        expect(new Text().toString()).toBe('');
        expect(new Text('foo').toString()).toBe('foo');
    });

    test('It returns a string when toJSON is called', () => {
        expect(new Text().toJSON()).toBe('');
        expect(new Text('foo').toJSON()).toBe('foo');
    });

    test('It returns a string when valueOf is called', () => {
        expect(new Text().valueOf()).toBe('');
        expect(new Text('foo').valueOf()).toBe('foo');
    });
});
