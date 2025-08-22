import { DateTime } from '@/types/dateTime.js';
import { describe, expect, test } from 'vitest';

describe('DateTime class', () => {
    test('It sets the default value', () => {
        const value = DateTime.now();

        const dateTime = new DateTime(value);

        expect(dateTime.value).toBe(value.value);
    });
});
