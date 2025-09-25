import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { DateTime } from '@/types/dateTime.js';
import { DateTimeString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('DateTime class', () => {
    test('It sets the correct value', () => {
        const value = '2022-01-01T00:00:00.000Z';

        const dateTime = new DateTime(value);

        expect(dateTime.value).toBe(value);
    });

    test('It throws an error if the value is not a string', () => {
        const values = [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new DateTime(value as unknown as DateTimeString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is not a valid date', () => {
        expect(() => new DateTime('foo' as unknown as DateTimeString)).toThrowError(
            TypeVaultValidationError
        );
    });

    test('It updates the value', () => {
        const value = '2023-01-02T01:23:45.123Z';
        const dateTime = new DateTime(value);

        expect(dateTime.value).toBe(value);

        dateTime.value = '2024-02-03T02:34:51.234Z';
        expect(dateTime.value).toBe('2024-02-03T02:34:51.234Z');
    });

    valueTests({ type: DateTime, validValue: '2023-01-02T01:23:45.123Z' });
    nullableTests({
        type: DateTime,
        validValue: '2023-01-02T01:23:45.123Z',
        invalidValue: 'not-valid',
    });
    immutableTests({ type: DateTime, validValue: '2023-01-02T01:23:45.123Z' });
});
