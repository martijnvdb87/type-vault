import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { TimeOnly } from '@/types/timeOnly.js';
import { TimeOnlyString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('TimeOnly class', () => {
    const values = [
        {
            input: '01:23:45.123',
            output: '01:23:45.123',
        },
        {
            input: '01:23:45',
            output: '01:23:45.000',
        },
        {
            input: '00:00:00.000',
            output: '00:00:00.000',
        },
        {
            input: '23:59:59.999',
            output: '23:59:59.999',
        },
    ] as const;

    test('It sets the correct value', () => {
        for (const { input, output } of values) {
            expect(new TimeOnly(input).value).toBe(output);
        }
    });

    test('It throws an error if the value is not a supported date string', () => {
        for (const value of [
            '24:23:45',
            '01:23:45.1000',
            '23:60:59.999',
            '01:00:60.000',
            '24:60:60.999',
        ]) {
            expect(() => new TimeOnly(value as unknown as TimeOnlyString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is not a string', () => {
        const values = [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new TimeOnly(value as unknown as TimeOnlyString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is not a valid date', () => {
        expect(() => new TimeOnly('foo' as unknown as TimeOnlyString)).toThrowError(
            TypeVaultValidationError
        );
    });

    valueTests({ type: TimeOnly, validValue: '12:34:56.789' });
    nullableTests({
        type: TimeOnly,
        validValue: '12:34:56.789',
        invalidValue: 1,
    });
    immutableTests({ type: TimeOnly, validValue: '12:34:56.789' });
});
