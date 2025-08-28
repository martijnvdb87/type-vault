import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Email } from '@/types/email.js';
import { describe, expect, test } from 'vitest';

describe('Email class', () => {
    test('It sets the value to the given valid email address', () => {
        expect(new Email('foo@example.com').value).toBe('foo@example.com');
    });

    test('It should throw an error if the value is not a valid email address', () => {
        expect(() => new Email('foo')).toThrowError(TypeVaultValidationError);
        expect(() => new Email('foo@example')).toThrowError(TypeVaultValidationError);
        expect(() => new Email('foo@example.')).toThrowError(TypeVaultValidationError);
        expect(() => new Email(undefined as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new Email(1 as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Email({} as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Email([] as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Email(true as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Email(false as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Email(BigInt(1) as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
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
});
