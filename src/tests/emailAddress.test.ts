import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { EmailAddress } from '@/types/emailAddress.js';
import { describe, expect, test } from 'vitest';

describe('EmailAddress class', () => {
    test('It sets the value to the given valid email address', () => {
        expect(new EmailAddress('sdsd@dasd.com').value).toBe('sdsd@dasd.com');
    });

    test('It should throw an error if the value is not a valid email address', () => {
        expect(() => new EmailAddress('foo')).toThrowError(TypeVaultValidationError);
        expect(() => new EmailAddress('foo@bar')).toThrowError(TypeVaultValidationError);
        expect(() => new EmailAddress('foo@bar.')).toThrowError(TypeVaultValidationError);
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
        expect(() => new EmailAddress(null as unknown as string)).toThrowError(
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
});
