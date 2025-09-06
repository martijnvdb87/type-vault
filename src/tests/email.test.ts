import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Email } from '@/types/email.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';

describe('Email class', () => {
    test('It sets the value to the given valid email address', () => {
        expect(new Email('foo@example.com').value).toBe('foo@example.com');
    });

    test('It should throw an error if the value is not a valid email address', () => {
        const values = [
            'foo',
            'foo@example',
            'foo@example.',
            undefined,
            1,
            {},
            [],
            true,
            false,
            BigInt(1),
        ];

        for (const value of values) {
            // @ts-expect-error Type error expected
            expect(() => new Email(value as unknown as string)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It returns a string when toString is called', () => {
        expect(new Email('foo@example.com').toString()).toBe('foo@example.com');
    });

    test('It returns a string when toJSON is called', () => {
        expect(new Email('foo@example.com').toJSON()).toBe('foo@example.com');
    });

    test('It returns a string when valueOf is called', () => {
        expect(new Email('foo@example.com').valueOf()).toBe('foo@example.com');
    });

    nullableTests({
        type: Email,
        validValue: 'foo@example.com',
        invalidValue: 'not-valid',
    });
    immutableTests({ type: Email, validValue: 'foo@example.com' });
});
