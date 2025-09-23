import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Email } from '@/types/email.js';
import { describe, expect, test } from 'vitest';
import { immutableTests } from './utils/immutableTests.js';
import { nullableTests } from './utils/nullableTests.js';
import { valueTests } from './utils/valueTests.js';

describe('Email class', () => {
    const values = [
        'user@example.com',
        'hello.world@domain.net',
        'newsletter+weekly@service.org',
        'admin+alerts@monitoring.io',
        'user_123@datahub.com',
        'dev-team@project42.dev',
        'Support@Example.COM',
        'John.DOE@Mail.org',
        'customer-service@ecommerce.biz',
        "a!b#c$d%e&f'g*h+i-j=k@weirdmail.com",
        'first.last@sub.domain.co.uk',
        'contact.us@info.example.nl',
        'user@xn--fsq.com',
    ] as const;

    test('It sets the value to the given valid email address', () => {
        for (const value of values) {
            expect(new Email(value).value).toBe(value);
        }
    });

    test('It should throw an error if the value is not a valid email address', () => {
        const values = [
            'foo',
            'foo@example',
            'foo@example.',
            undefined,
            1,
            {},
            [],
            true,
            false,
            BigInt(1),
        ];

        for (const value of values) {
            // @ts-expect-error Type error expected
            expect(() => new Email(value as unknown as string)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    valueTests({ type: Email, validValue: 'foo@example.com' });
    nullableTests({
        type: Email,
        validValue: 'foo@example.com',
        invalidValue: 'not-valid',
    });
    immutableTests({ type: Email, validValue: 'foo@example.com' });
});
