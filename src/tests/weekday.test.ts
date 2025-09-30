import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Weekday } from '@/types/weekday.js';
import { WeekdayString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('Weekday class', () => {
    const weekdays = [
        Weekday.Monday,
        Weekday.Tuesday,
        Weekday.Wednesday,
        Weekday.Thursday,
        Weekday.Friday,
        Weekday.Saturday,
        Weekday.Sunday,
    ];

    test('It sets the corrent value', () => {
        weekdays.forEach(({ value }) => {
            const weekday = new Weekday(value as WeekdayString);

            expect(weekday.value).toBe(value);
        });
    });

    test('It throws an error if the value is not a string', () => {
        const values = [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new Weekday(value as unknown as WeekdayString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It return an error when the value is not a valid weekday', () => {
        expect(() => new Weekday('foo' as unknown as WeekdayString)).toThrowError(
            TypeVaultValidationError
        );
    });

    for (const weekday of weekdays) {
        valueTests({ type: Weekday, validValue: weekday.value });
        nullableTests({
            type: Weekday,
            validValue: weekday.value,
            invalidValue: 'not-valid',
        });
        immutableTests({ type: Weekday, validValue: weekday.value });
    }
});
