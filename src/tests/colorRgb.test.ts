import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { ColorHex } from '@/types/colorHex.js';
import { ColorRgb } from '@/types/colorRgb.js';
import { ColorRgbString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

const values = [
    { input: 'rgb(0, 0, 0)', output: 'rgb(0 0 0 / 100%)', red: 0, green: 0, blue: 0, alpha: 100 },
    {
        input: 'rgb(255, 255, 255)',
        output: 'rgb(255 255 255 / 100%)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 100,
    },
    { input: 'rgba(0, 0, 0)', output: 'rgb(0 0 0 / 100%)', red: 0, green: 0, blue: 0, alpha: 100 },
    {
        input: 'rgba(255, 255, 255)',
        output: 'rgb(255 255 255 / 100%)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 100,
    },
    { input: 'rgba(0, 0, 0)', output: 'rgb(0 0 0 / 100%)', red: 0, green: 0, blue: 0, alpha: 100 },
    {
        input: 'rgba(255, 255, 255)',
        output: 'rgb(255 255 255 / 100%)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 100,
    },
    {
        input: 'rgba(0, 0, 0, 1)',
        output: 'rgb(0 0 0 / 100%)',
        red: 0,
        green: 0,
        blue: 0,
        alpha: 100,
    },
    {
        input: 'rgba(255, 255, 255, 1)',
        output: 'rgb(255 255 255 / 100%)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 100,
    },
    {
        input: 'rgba(0, 0, 0, 0.5)',
        output: 'rgb(0 0 0 / 50%)',
        red: 0,
        green: 0,
        blue: 0,
        alpha: 50,
    },
    {
        input: 'rgba(255, 255, 255, 0.5)',
        output: 'rgb(255 255 255 / 50%)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 50,
    },
    {
        input: 'rgba(0, 0, 0, 0.25)',
        output: 'rgb(0 0 0 / 25%)',
        red: 0,
        green: 0,
        blue: 0,
        alpha: 25,
    },
    {
        input: 'rgba(255, 255, 255, 0.25)',
        output: 'rgb(255 255 255 / 25%)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 25,
    },
    {
        input: 'rgba(0 0 0 / 0.125)',
        output: 'rgb(0 0 0 / 12.5%)',
        red: 0,
        green: 0,
        blue: 0,
        alpha: 12.5,
    },
    {
        input: 'rgba(255 255 255 / 0.125)',
        output: 'rgb(255 255 255 / 12.5%)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 12.5,
    },
    {
        input: 'rgb(0 0 0 / 0.125)',
        output: 'rgb(0 0 0 / 12.5%)',
        red: 0,
        green: 0,
        blue: 0,
        alpha: 12.5,
    },
    {
        input: 'rgb(255 255 255 / 0.125)',
        output: 'rgb(255 255 255 / 12.5%)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 12.5,
    },
] as const;

describe('ColorRgb class', () => {
    test('It sets the value to the given valid color', () => {
        for (const { input, output } of values) {
            expect(new ColorRgb(input).value).toBe(output);
        }
    });

    test('It should return the correct color values', () => {
        for (const { input, red, green, blue, alpha } of values) {
            expect(new ColorRgb(input).red).toBe(red);
            expect(new ColorRgb(input).green).toBe(green);
            expect(new ColorRgb(input).blue).toBe(blue);
            expect(new ColorRgb(input).alpha).toBe(alpha);
        }
    });

    test('It can update the color values', () => {
        for (const { output, red, green, blue, alpha } of values) {
            const color = ColorRgb.nullable();

            color.red = red;
            color.green = green;
            color.blue = blue;
            color.alpha = alpha;

            expect(color.value).toBe(output);
        }
    });

    test('It can modify color values', () => {
        const color = new ColorRgb('rgb(0, 0, 0)');

        color.red = 255;
        color.green = 255;
        color.blue = 255;
        color.alpha = 100;

        expect(color.value).toBe('rgb(255 255 255 / 100%)');

        color.red = 0;
        color.green = 0;
        color.blue = 0;
        color.alpha = 0;

        expect(color.value).toBe('rgb(0 0 0 / 0%)');

        color.red = 128;
        color.green = 128;
        color.blue = 128;
        color.alpha = 50;

        expect(color.value).toBe('rgb(128 128 128 / 50%)');

        color.red = 25;
        color.green = 50;
        color.blue = 100;
        color.alpha = 10;

        expect(color.value).toBe('rgb(25 50 100 / 10%)');

        color.red = 12.3;
        color.green = 45.6;
        color.blue = 7.89;
        color.alpha = 1.23;

        expect(color.value).toBe('rgb(12.3 45.6 7.89 / 1.23%)');
    });

    test('It should throw an error if the value is out of allowed range', () => {
        const color = new ColorRgb('rgb(0 0 0 / 0)');

        expect(() => (color.red = 256)).toThrowError();
        expect(() => (color.green = 256)).toThrowError();
        expect(() => (color.blue = 256)).toThrowError();
        expect(() => (color.alpha = 101)).toThrowError();

        expect(() => (color.red = -1)).toThrowError();
        expect(() => (color.green = -1)).toThrowError();
        expect(() => (color.blue = -1)).toThrowError();
        expect(() => (color.alpha = -1)).toThrowError();
    });

    test('It should throw an error if the value is not a valid color', () => {
        const values = ['example', '#foo', undefined, 1, {}, [], true, false, BigInt(1)];

        for (const value of values) {
            expect(() => new ColorRgb(value as unknown as ColorRgbString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It can be created from ColorHex', () => {
        const fromValue = [
            {
                input: '#000000',
                output: 'rgb(0 0 0 / 100%)',
            },
            {
                input: '#ffffff',
                output: 'rgb(255 255 255 / 100%)',
            },
            {
                input: '#ff0000',
                output: 'rgb(255 0 0 / 100%)',
            },
            {
                input: '#00ff00',
                output: 'rgb(0 255 0 / 100%)',
            },
            {
                input: '#0000ff',
                output: 'rgb(0 0 255 / 100%)',
            },
            {
                input: '#ffff00',
                output: 'rgb(255 255 0 / 100%)',
            },
            {
                input: '#00ffff',
                output: 'rgb(0 255 255 / 100%)',
            },
            {
                input: '#ff00ff',
                output: 'rgb(255 0 255 / 100%)',
            },
            {
                input: '#123456',
                output: 'rgb(18 52 86 / 100%)',
            },
            {
                input: '#abcdef',
                output: 'rgb(171 205 239 / 100%)',
            },
        ] as const;

        for (const { input, output } of fromValue) {
            expect(ColorRgb.from(new ColorHex(input)).value).toBe(output);
        }
    });

    for (const { output } of values) {
        valueTests({ type: ColorRgb, validValue: output });
        nullableTests({ type: ColorRgb, validValue: output, invalidValue: 'not-valid' });
        immutableTests({ type: ColorRgb, validValue: output });
    }
});
