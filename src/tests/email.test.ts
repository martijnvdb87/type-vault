import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Email } from '@/types/email.js';
import { describe, expect, test } from 'vitest';

describe('Email class', () => {
    test('It sets the value to the given valid email', () => {
        expect(new Email('sdsd@dasd.com').value).toBe('sdsd@dasd.com');
    });

    test('It should throw an error if the value is not a valid email', () => {
        expect(() => new Email('foo')).toThrowError(TypeVaultValidationError);
        expect(() => new Email('foo@bar')).toThrowError(TypeVaultValidationError);
        expect(() => new Email('foo@bar.')).toThrowError(TypeVaultValidationError);
        expect(() => new Email(undefined as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new Email(1 as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Email({} as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Email([] as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Email(null as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Email(true as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Email(false as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Email(BigInt(1) as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
    });
});
