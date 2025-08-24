import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Url } from '@/types/url.js';
import { describe, expect, test } from 'vitest';

describe('Url class', () => {
    test('It sets the value to the given valid url', () => {
        expect(new Url('https://example.com').value).toBe('https://example.com');
    });

    test('It should throw an error if the value is not a valid url', () => {
        expect(() => new Url('example')).toThrowError(TypeVaultValidationError);
        expect(() => new Url('example.')).toThrowError(TypeVaultValidationError);
        expect(() => new Url(undefined as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new Url(1 as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Url({} as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Url([] as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Url(true as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Url(false as unknown as string)).toThrowError(TypeVaultValidationError);
        expect(() => new Url(BigInt(1) as unknown as string)).toThrowError(
            TypeVaultValidationError
        );
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
});
