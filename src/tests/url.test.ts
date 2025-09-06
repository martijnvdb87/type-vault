import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Url } from '@/types/url.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';

describe('Url class', () => {
    test('It sets the value to the given valid url', () => {
        expect(new Url('https://example.com').value).toBe('https://example.com');
    });

    test('It should throw an error if the value is not a valid url', () => {
        const values = ['example', 'example.', undefined, 1, {}, [], true, false, BigInt(1)];

        for (const value of values) {
            expect(() => new Url(value as unknown as string)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It returns a string when toString is called', () => {
        expect(new Url('https://example.com').toString()).toBe('https://example.com');
    });

    test('It returns a string when toJSON is called', () => {
        expect(new Url('https://example.com').toJSON()).toBe('https://example.com');
    });

    test('It returns a string when valueOf is called', () => {
        expect(new Url('https://example.com').valueOf()).toBe('https://example.com');
    });

    nullableTests({ type: Url, validValue: 'https://example.com', invalidValue: 'not-valid' });
    immutableTests({ type: Url, validValue: 'https://example.com' });
});
