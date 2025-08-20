import { Integer } from '@/types/integer.js';
import { Nullable } from '@/utils/nullable.js';
import { describe, expect, test } from 'vitest';

describe('Nullable class', () => {
    test('It sets the default value to null', () => {
        expect(new Nullable(Integer).value).toBe(null);
    });

    test('It sets the correct value', () => {
        expect(new Nullable(Integer, 1).value).toBe(1);
        expect(new Nullable(Integer, null).value).toBe(null);
    });

    test('It sets the correct value', () => {
        const type = new Nullable(Integer);
        expect(type.value).toBe(null);

        type.value = 1;
        expect(type.value).toBe(1);

        type.value = null;
        expect(type.value).toBe(null);

        type.value = 2;
        expect(type.value).toBe(2);
    });

    test('It sets the correct type', () => {
        expect(new Nullable(Integer).type).toBe(Integer);
    });
});
