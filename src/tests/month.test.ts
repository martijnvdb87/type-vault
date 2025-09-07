import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Month } from '@/types/month.js';
import { MonthString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('Month class', () => {
    test('It sets the corrent value', () => {
        [
            'january',
            'february',
            'march',
            'april',
            'may',
            'june',
            'july',
            'august',
            'september',
            'october',
            'november',
            'december',
        ].forEach((value) => {
            const month = new Month(value as MonthString);

            expect(month.value).toBe(value);
        });
    });

    test('It throws an error if the value is not a string', () => {
        const values = [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new Month(value as unknown as MonthString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It return an error when the value is not a valid month', () => {
        expect(() => new Month('foo' as unknown as MonthString)).toThrowError(
            TypeVaultValidationError
        );
    });

    valueTests({ type: Month, validValue: Month.January.value });
    nullableTests({
        type: Month,
        validValue: Month.January.value,
        invalidValue: 'not-valid',
    });
    immutableTests({ type: Month, validValue: Month.January.value });
});
