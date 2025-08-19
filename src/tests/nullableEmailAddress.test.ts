import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { NullableEmailAddress } from '@/types/nullableEmailAddress.js';
import { describe, expect, test } from 'vitest';

describe('NullableEmailAddress class', () => {
    test('It sets the value to the given valid email address', () => {
        expect(new NullableEmailAddress().value).toBe(null);
        expect(new NullableEmailAddress('foo@bar.com').value).toBe('foo@bar.com');
        expect(new NullableEmailAddress(null).value).toBe(null);
    });

    test('It should throw an error if the value is not a valid email address', () => {
        expect(() => new NullableEmailAddress('foo')).toThrowError(TypeVaultValidationError);
        expect(() => new NullableEmailAddress('foo@bar')).toThrowError(TypeVaultValidationError);
        expect(() => new NullableEmailAddress('foo@bar.')).toThrowError(TypeVaultValidationError);
        expect(() => new NullableEmailAddress(1 as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new NullableEmailAddress({} as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new NullableEmailAddress([] as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new NullableEmailAddress(true as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new NullableEmailAddress(false as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new NullableEmailAddress(BigInt(1) as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
    });
});
