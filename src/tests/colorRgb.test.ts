import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { ColorRgb } from '@/types/colorRgb.js';
import { ColorRgbString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

const values = [
    { input: 'rgb(0, 0, 0)', output: 'rgba(0, 0, 0, 1)', red: 0, green: 0, blue: 0, alpha: 1 },
    {
        input: 'rgb(255, 255, 255)',
        output: 'rgba(255, 255, 255, 1)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 1,
    },
    { input: 'rgba(0, 0, 0)', output: 'rgba(0, 0, 0, 1)', red: 0, green: 0, blue: 0, alpha: 1 },
    {
        input: 'rgba(255, 255, 255)',
        output: 'rgba(255, 255, 255, 1)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 1,
    },
    { input: 'rgba(0, 0, 0)', output: 'rgba(0, 0, 0, 1)', red: 0, green: 0, blue: 0, alpha: 1 },
    {
        input: 'rgba(255, 255, 255)',
        output: 'rgba(255, 255, 255, 1)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 1,
    },
    {
        input: 'rgba(0, 0, 0, 1)',
        output: 'rgba(0, 0, 0, 1)',
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1,
    },
    {
        input: 'rgba(255, 255, 255, 1)',
        output: 'rgba(255, 255, 255, 1)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 1,
    },
    {
        input: 'rgba(0, 0, 0, 0.5)',
        output: 'rgba(0, 0, 0, 0.5)',
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0.5,
    },
    {
        input: 'rgba(255, 255, 255, 0.5)',
        output: 'rgba(255, 255, 255, 0.5)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 0.5,
    },
    {
        input: 'rgba(0, 0, 0, 0.25)',
        output: 'rgba(0, 0, 0, 0.25)',
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0.25,
    },
    {
        input: 'rgba(255, 255, 255, 0.25)',
        output: 'rgba(255, 255, 255, 0.25)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 0.25,
    },
    {
        input: 'rgba(0 0 0 / 0.125)',
        output: 'rgba(0, 0, 0, 0.125)',
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0.125,
    },
    {
        input: 'rgba(255 255 255 / 0.125)',
        output: 'rgba(255, 255, 255, 0.125)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 0.125,
    },
    {
        input: 'rgb(0 0 0 / 0.125)',
        output: 'rgba(0, 0, 0, 0.125)',
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0.125,
    },
    {
        input: 'rgb(255 255 255 / 0.125)',
        output: 'rgba(255, 255, 255, 0.125)',
        red: 255,
        green: 255,
        blue: 255,
        alpha: 0.125,
    },
] as const;

describe('ColorRgb class', () => {
    test('It sets the value to the given valid color', () => {
        for (const { input, output } of values) {
            expect(new ColorRgb(input).value).toBe(output);
        }
    });

    test('It should throw an error if the value is not a valid color', () => {
        const values = ['example', '#foo', undefined, 1, {}, [], true, false, BigInt(1)];

        for (const value of values) {
            expect(() => new ColorRgb(value as unknown as ColorRgbString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    for (const { output } of values) {
        valueTests({ type: ColorRgb, validValue: output });
        nullableTests({ type: ColorRgb, validValue: output, invalidValue: 'not-valid' });
        immutableTests({ type: ColorRgb, validValue: output });
    }
});
