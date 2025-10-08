import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { ColorOklch } from '@/types/colorOklch.js';
import { ColorOklchValue } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

const values = [
    {
        input: 'oklch(0.7 0.2 120)',
        output: 'oklch(70% 0.2 120deg / 100%)',
        lightness: 70,
        chroma: 0.2,
        hue: 120,
        alpha: 100,
    },
    {
        input: 'oklch(0.7 0.2 120 / 50%)',
        output: 'oklch(70% 0.2 120deg / 50%)',
        lightness: 70,
        chroma: 0.2,
        hue: 120,
        alpha: 50,
    },
    {
        input: 'oklch(70% 100% 120deg / 0.25)',
        output: 'oklch(70% 0.4 120deg / 25%)',
        lightness: 70,
        chroma: 0.4,
        hue: 120,
        alpha: 25,
    },
    {
        input: 'oklch(.1% .1% .1deg / .1%)',
        output: 'oklch(0.1% 0.0004 0.1deg / 0.1%)',
        lightness: 0.1,
        chroma: 0.0004,
        hue: 0.1,
        alpha: 0.1,
    },
    {
        input: 'oklch(.1 .1 .1 / .1)',
        output: 'oklch(10% 0.1 0.1deg / 10%)',
        lightness: 10,
        chroma: 0.1,
        hue: 0.1,
        alpha: 10,
    },
    {
        input: 'oklch(100% 100% 360deg / 100%)',
        output: 'oklch(100% 0.4 360deg / 100%)',
        lightness: 100,
        chroma: 0.4,
        hue: 360,
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
            expect(() => new ColorOklch(value as unknown as ColorOklchValue)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It should return the correct color values', () => {
        for (const { input, lightness, chroma, hue, alpha } of values) {
            expect(new ColorOklch(input).lightness).toBe(lightness);
            expect(new ColorOklch(input).chroma).toBe(chroma);
            expect(new ColorOklch(input).hue).toBe(hue);
            expect(new ColorOklch(input).alpha).toBe(alpha);
        }
    });

    test('It can update the color values', () => {
        for (const { output, lightness, chroma, hue, alpha } of values) {
            const color = ColorOklch.nullable();

            color.lightness = lightness;
            color.chroma = chroma;
            color.hue = hue;
            color.alpha = alpha;

            expect(color.value).toBe(output);
        }
    });

    test('It can modify color values', () => {
        const color = new ColorOklch('oklch(0 0 0)');

        color.lightness = 100;
        color.chroma = 0.4;
        color.hue = 100;
        color.alpha = 100;

        expect(color.value).toBe('oklch(100% 0.4 100deg / 100%)');

        color.lightness = 0;
        color.chroma = 0;
        color.hue = 0;
        color.alpha = 0;

        expect(color.value).toBe('oklch(0% 0 0deg / 0%)');

        color.lightness = 50;
        color.chroma = 0.2;
        color.hue = 180;
        color.alpha = 50;

        expect(color.value).toBe('oklch(50% 0.2 180deg / 50%)');

        color.lightness = 12.5;
        color.chroma = 0.125;
        color.hue = 37.5;
        color.alpha = 12.34;

        expect(color.value).toBe('oklch(12.5% 0.125 37.5deg / 12.34%)');
    });

    test('It should throw an error if the value is out of allowed range', () => {
        const color = new ColorOklch('oklch(0 0 0)');

        expect(() => (color.lightness = 101)).toThrowError();
        expect(() => (color.chroma = 2)).toThrowError();
        expect(() => (color.hue = 361)).toThrowError();
        expect(() => (color.alpha = 101)).toThrowError();

        expect(() => (color.lightness = -1)).toThrowError();
        expect(() => (color.chroma = -1)).toThrowError();
        expect(() => (color.hue = -1)).toThrowError();
        expect(() => (color.alpha = -1)).toThrowError();
    });

    test('It should throw an error if the value is not a valid color', () => {
        const values = ['example', '#foo', undefined, 1, {}, [], true, false, BigInt(1)];

        for (const value of values) {
            expect(() => new ColorOklch(value as unknown as ColorOklchValue)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    for (const { output } of values) {
        valueTests({ type: ColorOklch, validValue: output });
        nullableTests({ type: ColorOklch, validValue: output, invalidValue: 'not-valid' });
        immutableTests({ type: ColorOklch, validValue: output });
    }
});
