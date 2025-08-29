import { Email } from '@/types/email.js';
import { Integer } from '@/types/integer.js';
import { Uuid } from '@/types/uuid.js';
import { Uuidv4 } from '@/types/uuidv4.js';
import { Immutable } from '@/utils/immutable.js';
import { Nullable } from '@/utils/nullable.js';
import { describe, expect, test } from 'vitest';

describe('Immutable function', () => {
    test('It expects instance of Integer', () => {
        const immutable = Immutable(new Integer());

        expect(immutable instanceof Integer).toBeTruthy();
    });

    test('It throws an error when trying to set the value', () => {
        const immutable = Immutable(new Integer());

        expect(() => {
            // @ts-expect-error Type error expected
            immutable.value = 1;
        }).toThrowError(Error);
    });

    test('It throws an error when trying to set the value of nullable', () => {
        const immutable = Immutable(Nullable(new Integer()));

        expect(() => {
            // @ts-expect-error Type error expected
            immutable.value = 1;
        }).toThrowError(Error);
        expect(immutable.value).toBe(null);
    });

    test('It expects instance of Uuid', () => {
        const immutable = Immutable(Uuidv4.random());

        expect(immutable instanceof Uuid).toBeTruthy();
        expect(immutable instanceof Uuidv4).toBeTruthy();
    });

    test('It throws an error when trying to set the value of Uuid', () => {
        const immutable = Immutable(Uuidv4.random());

        expect(() => {
            // @ts-expect-error Type error expected
            immutable.value = 'foo';
        }).toThrowError(Error);
    });

    test('It expects instance of Email', () => {
        const immutable = Immutable(new Email('foo@example.com'));

        expect(immutable instanceof Email).toBeTruthy();
    });

    test('It throws an error when trying to set the value of Email', () => {
        const immutable = Immutable(new Email('foo@example.com'));

        expect(() => {
            // @ts-expect-error Type error expected
            immutable.value = 'foo';
        }).toThrowError(Error);
    });
});
