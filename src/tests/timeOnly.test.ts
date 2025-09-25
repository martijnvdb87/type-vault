import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { TimeOnly } from '@/types/timeOnly.js';
import { TimeOnlyString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('TimeOnly class', () => {
    test('It sets the correct value', () => {
        const value = '12:34:56.789';
        const timeOnly = new TimeOnly(value);

        expect(timeOnly.value).toBe(value);
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
