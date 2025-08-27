import { Integer } from '@/types/integer.js';
import { Immutable } from '@/utils/immutable.js';
import { describe, expect, test } from 'vitest';

describe('Immutable function', () => {
    test('It expects instance of Integer', () => {
        const immutable = Immutable(new Integer());

        expect(immutable instanceof Integer).toBeTruthy();
    });

    test('It expects instance of Integer', () => {
        const immutable = Immutable(new Integer());

        expect(() => {
            // @ts-expect-error This is not allowed
            immutable.value = 1;
        }).toThrowError(Error);
    });
});
