import { Integer } from '@/types/integer.js';
import { Collection } from '@/utils/collection.js';
import { describe, expect, test } from 'vitest';

describe('Collection class', () => {
    test('It sets the correct value', () => {
        const collection = new Collection(Integer, [
            new Integer(1),
            new Integer(2),
            new Integer(3),
        ]);

        expect(collection.type).toBe(Integer);

        collection.toArray().forEach((item, index) => {
            expect(item instanceof Integer).toBe(true);
            expect(item.value).toBe(index + 1);
        });
    });
});
