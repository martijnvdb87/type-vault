import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { ColorHex } from '@/types/colorHex.js';
import { ColorHexString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

const values = [
    { input: '#000000', output: '#000000ff', red: 0, green: 0, blue: 0, alpha: 255 },
    { input: '#FFFFFF', output: '#ffffffff', red: 255, green: 255, blue: 255, alpha: 255 },
    { input: '#FF0000', output: '#ff0000ff', red: 255, green: 0, blue: 0, alpha: 255 },
    { input: '#00FF00', output: '#00ff00ff', red: 0, green: 255, blue: 0, alpha: 255 },
    { input: '#0000FF', output: '#0000ffff', red: 0, green: 0, blue: 255, alpha: 255 },
    { input: '#FFFF00', output: '#ffff00ff', red: 255, green: 255, blue: 0, alpha: 255 },
    { input: '#00FFFF', output: '#00ffffff', red: 0, green: 255, blue: 255, alpha: 255 },
    { input: '#FF00FF', output: '#ff00ffff', red: 255, green: 0, blue: 255, alpha: 255 },
    { input: '#888888', output: '#888888ff', red: 136, green: 136, blue: 136, alpha: 255 },
    { input: '#CCCCCC', output: '#ccccccff', red: 204, green: 204, blue: 204, alpha: 255 },
    { input: '#000', output: '#000000ff', red: 0, green: 0, blue: 0, alpha: 255 },
    { input: '#FFF', output: '#ffffffff', red: 255, green: 255, blue: 255, alpha: 255 },
    { input: '#F00', output: '#ff0000ff', red: 255, green: 0, blue: 0, alpha: 255 },
    { input: '#0F0', output: '#00ff00ff', red: 0, green: 255, blue: 0, alpha: 255 },
    { input: '#00F', output: '#0000ffff', red: 0, green: 0, blue: 255, alpha: 255 },
    { input: '#FF0', output: '#ffff00ff', red: 255, green: 255, blue: 0, alpha: 255 },
    { input: '#0FF', output: '#00ffffff', red: 0, green: 255, blue: 255, alpha: 255 },
    { input: '#F0F', output: '#ff00ffff', red: 255, green: 0, blue: 255, alpha: 255 },
    { input: '#888', output: '#888888ff', red: 136, green: 136, blue: 136, alpha: 255 },
    { input: '#CCC', output: '#ccccccff', red: 204, green: 204, blue: 204, alpha: 255 },
    { input: '#00000000', output: '#00000000', red: 0, green: 0, blue: 0, alpha: 0 },
    { input: '#FFFFFFFF', output: '#ffffffff', red: 255, green: 255, blue: 255, alpha: 255 },
    {
        input: '#FF0000F0',
        output: '#ff0000f0',
        red: 255,
        green: 0,
        blue: 0,
        alpha: 240,
    },
    {
        input: '#00FF000F',
        output: '#00ff000f',
        red: 0,
        green: 255,
        blue: 0,
        alpha: 15,
    },
    { input: '#0000FF00', output: '#0000ff00', red: 0, green: 0, blue: 255, alpha: 0 },
    {
        input: '#FFFF00F0',
        output: '#ffff00f0',
        red: 255,
        green: 255,
        blue: 0,
        alpha: 240,
    },
    {
        input: '#00FFFF0F',
        output: '#00ffff0f',
        red: 0,
        green: 255,
        blue: 255,
        alpha: 15,
    },
    { input: '#FF00FFFF', output: '#ff00ffff', red: 255, green: 0, blue: 255, alpha: 255 },
    {
        input: '#88888888',
        output: '#88888888',
        red: 136,
        green: 136,
        blue: 136,
        alpha: 136,
    },
    {
        input: '#CCCCCCCC',
        output: '#cccccccc',
        red: 204,
        green: 204,
        blue: 204,
        alpha: 204,
    },
] as const;

describe('ColorHex class', () => {
    test('It sets the value to the given valid color', () => {
        for (const { input, output } of values) {
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

    test('It should return the correct color values', () => {
        for (const { input, red, green, blue, alpha } of values) {
            expect(new ColorHex(input).red).toBe(red);
            expect(new ColorHex(input).green).toBe(green);
            expect(new ColorHex(input).blue).toBe(blue);
            expect(new ColorHex(input).alpha).toBe(alpha);
        }
    });

    test('It can update the color values', () => {
        for (const { output, red, green, blue, alpha } of values) {
            const color = ColorHex.nullable();

            color.red = red;
            color.green = green;
            color.blue = blue;
            color.alpha = alpha;

            expect(color.value).toBe(output);
        }
    });

    test('It can modify color values', () => {
        const color = new ColorHex('#000000');

        color.red = 255;
        color.green = 255;
        color.blue = 255;
        color.alpha = 255;

        expect(color.value).toBe('#ffffffff');

        color.red = 0;
        color.green = 0;
        color.blue = 0;
        color.alpha = 0;

        expect(color.value).toBe('#00000000');

        color.red = 128;
        color.green = 128;
        color.blue = 128;
        color.alpha = 128;

        expect(color.value).toBe('#80808080');

        color.red = 25;
        color.green = 50;
        color.blue = 100;
        color.alpha = 150;

        expect(color.value).toBe('#19326496');

        color.red = 999;
        color.green = 999;
        color.blue = 999;
        color.alpha = 999;

        expect(color.value).toBe('#ffffffff');

        color.red = -1;
        color.green = -1;
        color.blue = -1;
        color.alpha = -1;

        expect(color.value).toBe('#00000000');
    });

    test('It throws an error if the value is changed when immutable', () => {
        const instance = ColorHex.immutable('#00000000');

        expect(() => {
            instance.red = 1;
        }).toThrowError(TypeVaultValidationError);

        expect(() => {
            instance.green = 1;
        }).toThrowError(TypeVaultValidationError);

        expect(() => {
            instance.blue = 1;
        }).toThrowError(TypeVaultValidationError);

        expect(() => {
            instance.alpha = 1;
        }).toThrowError(TypeVaultValidationError);

        expect(instance.value).toBe('#00000000');
    });

    for (const { output } of values) {
        valueTests({ type: ColorHex, validValue: output });
        nullableTests({ type: ColorHex, validValue: output, invalidValue: 'not-valid' });
        immutableTests({ type: ColorHex, validValue: output });
    }
});
