import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { ColorHsl } from '@/types/colorHsl.js';
import { ColorHslString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

const values = [
    {
        input: 'hsl(0 0 0 / 0)',
        output: 'hsl(0deg 0% 0% / 0%)',
        hue: 0,
        saturation: 0,
        lightness: 0,
        alpha: 0,
    },
    {
        input: 'hsl(0deg 0% 0% / 0%)',
        output: 'hsl(0deg 0% 0% / 0%)',
        hue: 0,
        saturation: 0,
        lightness: 0,
        alpha: 0,
    },
    {
        input: 'hsl(1.23 4.56 7.89 / 3.45%)',
        output: 'hsl(1.23deg 4.56% 7.89% / 3.45%)',
        hue: 1.23,
        saturation: 4.56,
        lightness: 7.89,
        alpha: 3.45,
    },
    {
        input: 'hsla(360deg 100% 100% / 100%)',
        output: 'hsl(360deg 100% 100% / 100%)',
        hue: 360,
        saturation: 100,
        lightness: 100,
        alpha: 100,
    },
    {
        input: 'hsl(0, 0, 0, 0)',
        output: 'hsl(0deg 0% 0% / 0%)',
        hue: 0,
        saturation: 0,
        lightness: 0,
        alpha: 0,
    },
    {
        input: 'hsl(0, 0, 0)',
        output: 'hsl(0deg 0% 0% / 100%)',
        hue: 0,
        saturation: 0,
        lightness: 0,
        alpha: 100,
    },
    {
        input: 'hsl(0, 0, 0, 1)',
        output: 'hsl(0deg 0% 0% / 100%)',
        hue: 0,
        saturation: 0,
        lightness: 0,
        alpha: 100,
    },
    {
        input: 'hsl(0, 0, 0, 0.5)',
        output: 'hsl(0deg 0% 0% / 50%)',
        hue: 0,
        saturation: 0,
        lightness: 0,
        alpha: 50,
    },
] as const;

describe('ColorHsl class', () => {
    test('It sets the value to the given valid color', () => {
        for (const { input, output } of values) {
            expect(new ColorHsl(input).value).toBe(output);
        }
    });

    test('It should return the correct color values', () => {
        for (const { input, hue, saturation, lightness, alpha } of values) {
            expect(new ColorHsl(input).hue).toBe(hue);
            expect(new ColorHsl(input).saturation).toBe(saturation);
            expect(new ColorHsl(input).lightness).toBe(lightness);
            expect(new ColorHsl(input).alpha).toBe(alpha);
        }
    });

    test('It can update the color values', () => {
        for (const { output, hue, saturation, lightness, alpha } of values) {
            const color = ColorHsl.nullable();

            color.hue = hue;
            color.saturation = saturation;
            color.lightness = lightness;
            color.alpha = alpha;

            expect(color.value).toBe(output);
        }
    });

    test('It can modify color values', () => {
        const color = new ColorHsl('hsl(0, 0, 0)');

        color.hue = 360;
        color.saturation = 100;
        color.lightness = 100;
        color.alpha = 100;

        expect(color.value).toBe('hsl(360deg 100% 100% / 100%)');

        color.hue = 0;
        color.saturation = 0;
        color.lightness = 0;
        color.alpha = 0;

        expect(color.value).toBe('hsl(0deg 0% 0% / 0%)');

        color.hue = 180;
        color.saturation = 50;
        color.lightness = 50;
        color.alpha = 50;

        expect(color.value).toBe('hsl(180deg 50% 50% / 50%)');

        color.hue = 25;
        color.saturation = 50;
        color.lightness = 100;
        color.alpha = 10;

        expect(color.value).toBe('hsl(25deg 50% 100% / 10%)');

        color.hue = 12.3;
        color.saturation = 45.6;
        color.lightness = 7.89;
        color.alpha = 1.23;

        expect(color.value).toBe('hsl(12.3deg 45.6% 7.89% / 1.23%)');
    });

    test('It should throw an error if the value is out of allowed range', () => {
        const color = new ColorHsl('hsl(0deg, 0%, 0%, 0)');

        expect(() => (color.hue = 361)).toThrowError();
        expect(() => (color.saturation = 101)).toThrowError();
        expect(() => (color.lightness = 101)).toThrowError();
        expect(() => (color.alpha = 101)).toThrowError();

        expect(() => (color.hue = -1)).toThrowError();
        expect(() => (color.saturation = -1)).toThrowError();
        expect(() => (color.lightness = -1)).toThrowError();
        expect(() => (color.alpha = -1)).toThrowError();
    });

    test('It should throw an error if the value is not a valid color', () => {
        const values = ['example', '#foo', undefined, 1, {}, [], true, false, BigInt(1)];

        for (const value of values) {
            expect(() => new ColorHsl(value as unknown as ColorHslString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    for (const { output } of values) {
        valueTests({ type: ColorHsl, validValue: output });
        nullableTests({ type: ColorHsl, validValue: output, invalidValue: 'not-valid' });
        immutableTests({ type: ColorHsl, validValue: output });
    }
});
