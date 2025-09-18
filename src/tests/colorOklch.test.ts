import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { ColorOklch } from '@/types/colorOklch.js';
import { ColorOklchString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';

const values = [
    {
        input: 'oklch(0.7 0.2 120)',
        output: 'oklch(70% 0.2 120deg / 100%)',
        lightness: 70,
        chroma: 0.2,
        hue: 120,
        alpha: 100,
    },
] as const;

describe('ColorOklch class', () => {
    test('It sets the value to the given valid color', () => {
        for (const { input, output } of values) {
            expect(new ColorOklch(input).value).toBe(output);
        }
    });

    test('It should throw an error if the value is not a valid color', () => {
        const values = ['example', '#foo', undefined, 1, {}, [], true, false, BigInt(1)];

        for (const value of values) {
            expect(() => new ColorOklch(value as unknown as ColorOklchString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    // test('It should return the correct color values', () => {
    //     for (const { input, lightness, chroma, hue, alpha } of values) {
    //         expect(new ColorOklch(input).lightness).toBe(lightness);
    //         expect(new ColorOklch(input).chroma).toBe(chroma);
    //         expect(new ColorOklch(input).hue).toBe(hue);
    //         expect(new ColorOklch(input).alpha).toBe(alpha);
    //     }
    // });
});
