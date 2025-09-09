import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { ColorRgb } from '@/types/colorRgb.js';
import { ColorRgbString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

const values = [
    'rgb(0, 0, 0)',
    'rgb(255, 255, 255)',
    'rgba(0, 0, 0)',
    'rgba(255, 255, 255)',
    'rgba(0, 0, 0, 1)',
    'rgba(255, 255, 255, 1)',
    'rgba(0, 0, 0, 0.5)',
    'rgba(255, 255, 255, 0.5)',
    'rgba(0, 0, 0, 0.25)',
    'rgba(255, 255, 255, 0.25)',
    'rgba(0 0 0 / 0.125)',
    'rgba(255 255 255 / 0.125)',
    'rgb(0 0 0 / 0.25)',
    'rgb(255 255 255 / 0.25)',
] as const;

describe('ColorRgb class', () => {
    test('It sets the value to the given valid color', () => {
        for (const value of values) {
            expect(new ColorRgb(value).value).toBe(value);
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

    for (const validValue of values) {
        valueTests({ type: ColorRgb, validValue });
        nullableTests({ type: ColorRgb, validValue, invalidValue: 'not-valid' });
        immutableTests({ type: ColorRgb, validValue });
    }
});
