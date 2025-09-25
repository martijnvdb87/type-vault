import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { DateOnly } from '@/types/dateOnly.js';
import { DateOnlyString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('DateOnly class', () => {
    test('It sets the correct value', () => {
        const value = '2022-01-01';

        const dateOnly = new DateOnly(value);

        expect(dateOnly.value).toBe(value);
    });

    test('It throws an error if the value is not a string', () => {
        const values = [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new DateOnly(value as unknown as DateOnlyString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is not a valid date', () => {
        expect(() => new DateOnly('foo' as unknown as DateOnlyString)).toThrowError(
            TypeVaultValidationError
        );
    });

    valueTests({ type: DateOnly, validValue: '2023-01-01' });
    nullableTests({ type: DateOnly, validValue: '2023-01-01', invalidValue: 'not-valid' });
    immutableTests({ type: DateOnly, validValue: '2023-01-01' });
});
