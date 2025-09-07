import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Text } from '@/types/text.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('Text class', () => {
    test('It sets the correct value', () => {
        expect(new Text('foo').value).toBe('foo');
    });

    test('It throws an error if the value is not a string', () => {
        const values = [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new Text(value as unknown as string)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    valueTests({ type: Text, validValue: 'foo' });
    nullableTests({
        type: Text,
        validValue: 'foo',
        invalidValue: 1,
    });
    immutableTests({ type: Text, validValue: 'foo' });
});
