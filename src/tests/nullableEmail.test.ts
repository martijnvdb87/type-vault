import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { NullableEmail } from '@/types/nullableEmail.js';
import { describe, expect, test } from 'vitest';

describe('NullableEmail class', () => {
    test('It sets the value to the given valid email', () => {
        expect(new NullableEmail().value).toBe(null);
        expect(new NullableEmail('foo@bar.com').value).toBe('foo@bar.com');
        expect(new NullableEmail(null).value).toBe(null);
    });

    test('It should throw an error if the value is not a valid email', () => {
        expect(() => new NullableEmail('foo')).toThrowError(TypeVaultValidationError);
        expect(() => new NullableEmail('foo@bar')).toThrowError(TypeVaultValidationError);
        expect(() => new NullableEmail('foo@bar.')).toThrowError(TypeVaultValidationError);
        expect(() => new NullableEmail(1 as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new NullableEmail({} as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new NullableEmail([] as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new NullableEmail(true as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new NullableEmail(false as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new NullableEmail(BigInt(1) as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
    });
});
