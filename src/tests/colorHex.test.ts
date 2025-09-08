import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { ColorHex } from '@/types/colorHex.js';
import { ColorHexString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

const values = [
    '#000000',
    '#FFFFFF',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#00FFFF',
    '#FF00FF',
    '#888888',
    '#CCCCCC',
    '#000',
    '#FFF',
    '#F00',
    '#0F0',
    '#00F',
    '#FF0',
    '#0FF',
    '#F0F',
    '#888',
    '#CCC',
    '#00000000',
    '#FFFFFFFF',
    '#FF0000F0',
    '#00FF000F',
    '#0000FF00',
    '#FFFF00F0',
    '#00FFFF0F',
    '#FF00FFFF',
    '#88888888',
    '#CCCCCCCC',
] as const;

describe('ColorHex class', () => {
    test('It sets the value to the given valid color', () => {
        for (const value of values) {
            expect(new ColorHex(value).value).toBe(value);
        }
    });

    test('It should throw an error if the value is not a valid color', () => {
        const values = ['example', '#foo', undefined, 1, {}, [], true, false, BigInt(1)];

        for (const value of values) {
            expect(() => new ColorHex(value as unknown as ColorHexString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    for (const validValue of values) {
        valueTests({ type: ColorHex, validValue });
        nullableTests({ type: ColorHex, validValue, invalidValue: 'not-valid' });
        immutableTests({ type: ColorHex, validValue });
    }
});
