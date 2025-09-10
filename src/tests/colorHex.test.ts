import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { ColorHex } from '@/types/colorHex.js';
import { ColorHexString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

const values = [
    ['#000000', '#000000ff'],
    ['#FFFFFF', '#ffffffff'],
    ['#FF0000', '#ff0000ff'],
    ['#00FF00', '#00ff00ff'],
    ['#0000FF', '#0000ffff'],
    ['#FFFF00', '#ffff00ff'],
    ['#00FFFF', '#00ffffff'],
    ['#FF00FF', '#ff00ffff'],
    ['#888888', '#888888ff'],
    ['#CCCCCC', '#ccccccff'],
    ['#000', '#000000ff'],
    ['#FFF', '#ffffffff'],
    ['#F00', '#ff0000ff'],
    ['#0F0', '#00ff00ff'],
    ['#00F', '#0000ffff'],
    ['#FF0', '#ffff00ff'],
    ['#0FF', '#00ffffff'],
    ['#F0F', '#ff00ffff'],
    ['#888', '#888888ff'],
    ['#CCC', '#ccccccff'],
    ['#00000000', '#00000000'],
    ['#FFFFFFFF', '#ffffffff'],
    ['#FF0000F0', '#ff0000f0'],
    ['#00FF000F', '#00ff000f'],
    ['#0000FF00', '#0000ff00'],
    ['#FFFF00F0', '#ffff00f0'],
    ['#00FFFF0F', '#00ffff0f'],
    ['#FF00FFFF', '#ff00ffff'],
    ['#88888888', '#88888888'],
    ['#CCCCCCCC', '#cccccccc'],
] as const;

describe('ColorHex class', () => {
    test('It sets the value to the given valid color', () => {
        for (const [input, output] of values) {
            expect(new ColorHex(input).value).toBe(output);
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

    for (const [, validValue] of values) {
        valueTests({ type: ColorHex, validValue });
        nullableTests({ type: ColorHex, validValue, invalidValue: 'not-valid' });
        immutableTests({ type: ColorHex, validValue });
    }
});
