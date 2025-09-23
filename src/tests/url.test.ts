import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Url } from '@/types/url.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('Url class', () => {
    const values = [
        'http://example.com',
        'https://example.com',
        'https://blog.example.com',
        'https://shop.uk.example.co.uk',
        'https://example.com/about',
        'https://example.com/products/item/123',
        'https://example.com/search?q=regex',
        'https://example.com/api?user=john&id=42',
        'https://example.com/docs#section2',
        'https://example.com/page#top',
        'http://localhost:3000',
        'https://example.com:8080/dashboard',
        'https://user:pass@example.com',
        'https://xn--fsq.com',
        'https://example.com/.well-known/security.txt',
        'https://example.com/?empty=',
        'https://example.com/path/with%20spaces',
    ];

    test('It sets the value to the given valid url', () => {
        for (const value of values) {
            expect(new Url(value).value).toBe(value);
        }
    });

    test('It should throw an error if the value is not a valid url', () => {
        const values = ['example', 'example.', undefined, 1, {}, [], true, false, BigInt(1)];

        for (const value of values) {
            expect(() => new Url(value as unknown as string)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    for (const validValue of values) {
        valueTests({ type: Url, validValue });
        nullableTests({ type: Url, validValue, invalidValue: 'not-valid' });
        immutableTests({ type: Url, validValue });
    }
});
