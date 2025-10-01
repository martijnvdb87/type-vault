import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Duration } from '@/types/duration.js';
import { DurationString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('Duration class', () => {
    const values = [
        {
            input: 'P3Y6M4DT12H30M5S',
            output: 'P3Y6M4DT12H30M5S',
        },
        {
            input: 'P0Y0M0DT0H0M0S',
            output: 'P0Y0M0DT0H0M0S',
        },
        {
            input: 'P1Y',
            output: 'P1Y0M0DT0H0M0S',
        },
        {
            input: 'P1M',
            output: 'P0Y1M0DT0H0M0S',
        },
        {
            input: 'P1D',
            output: 'P0Y0M1DT0H0M0S',
        },
        {
            input: 'PT1H',
            output: 'P0Y0M0DT1H0M0S',
        },
        {
            input: 'PT1M',
            output: 'P0Y0M0DT0H1M0S',
        },
        {
            input: 'PT1S',
            output: 'P0Y0M0DT0H0M1S',
        },
        {
            input: 'P0.1MT2.3S',
            output: 'P0Y0.1M0DT0H0M2.3S',
        },
    ] as const;

    test('It sets the correct value', () => {
        for (const { input, output } of values) {
            expect(new Duration(input).value).toBe(output);
        }
    });

    test('It throws an error if the value is not a supported date string', () => {
        for (const value of [
            '3Y6M4DT12H30M5S',
            'P3Y6M4D12H30M5S',
            '',
            'P3Y6M4DT12H30M5',
            '1234567890',
            'P3Y6M4DT12H30M5Sx',
            '2000-01-01T00:00:00.000Z',
            '2000-01-01',
            '00:00:00',
        ]) {
            expect(() => new Duration(value as unknown as DurationString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is not a string', () => {
        for (const value of [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)]) {
            expect(() => new Duration(value as unknown as DurationString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is not a valid date', () => {
        expect(() => new Duration('foo' as unknown as DurationString)).toThrowError(
            TypeVaultValidationError
        );
    });

    test('It updates the value', () => {
        const value = 'P1Y2M3DT4H5M6S';
        const duration = new Duration(value);

        expect(duration.value).toBe(value);

        duration.value = 'P7Y8M9DT10H11M12S';
        expect(duration.value).toBe('P7Y8M9DT10H11M12S');
    });

    for (const validValue of values.map(({ output }) => output)) {
        valueTests({ type: Duration, validValue });
        nullableTests({
            type: Duration,
            validValue,
            invalidValue: 'not-valid',
        });
        immutableTests({ type: Duration, validValue });
    }
});
