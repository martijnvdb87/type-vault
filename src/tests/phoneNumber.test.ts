import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { PhoneNumber } from '@/types/phoneNumber.js';
import { PhoneNumberString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('PhoneNumber class', () => {
    const values = ['+123456789', '+12', '+2468', '+97531'] as const;

    test('It sets the correct value', () => {
        for (const value of values) {
            expect(new PhoneNumber(value).value).toBe(value);
        }
    });

    test('It throws an error if the value is not a string', () => {
        const values = [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new PhoneNumber(value as unknown as PhoneNumberString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is not a supported value', () => {
        for (const value of ['+0987654321', '+1234567891234567', '1234567890', '00123456789']) {
            expect(() => new PhoneNumber(value as unknown as PhoneNumberString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    for (const validValue of values) {
        valueTests({ type: PhoneNumber, validValue });
        nullableTests({
            type: PhoneNumber,
            validValue,
            invalidValue: 1,
        });
        immutableTests({ type: PhoneNumber, validValue });
    }
});
