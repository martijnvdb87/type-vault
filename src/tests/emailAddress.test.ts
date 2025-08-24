import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { EmailAddress } from '@/types/emailAddress.js';
import { describe, expect, test } from 'vitest';

describe('EmailAddress class', () => {
    test('It sets the value to the given valid email address', () => {
        expect(new EmailAddress('foo@example.com').value).toBe('foo@example.com');
    });

    test('It should throw an error if the value is not a valid email address', () => {
        expect(() => new EmailAddress('foo')).toThrowError(TypeVaultValidationError);
        expect(() => new EmailAddress('foo@example')).toThrowError(TypeVaultValidationError);
        expect(() => new EmailAddress('foo@example.')).toThrowError(TypeVaultValidationError);
        expect(() => new EmailAddress(undefined as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new EmailAddress(1 as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new EmailAddress({} as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new EmailAddress([] as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new EmailAddress(true as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new EmailAddress(false as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new EmailAddress(BigInt(1) as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
    });

    test('It returns a string when toString is called', () => {
        expect(new EmailAddress('foo@example.com').toString()).toBe('foo@example.com');
    });

    test('It returns a string when toJSON is called', () => {
        expect(new EmailAddress('foo@example.com').toJSON()).toBe('foo@example.com');
    });

    test('It returns a string when valueOf is called', () => {
        expect(new EmailAddress('foo@example.com').valueOf()).toBe('foo@example.com');
    });
});
