import { Float } from '@/types/float.js';
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

    describe('Concat method', () => {
        test('It can concat', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            const other = new Collection(Integer, [new Integer(4), new Integer(5), new Integer(6)]);

            collection.concat(other);

            collection.toArray().forEach((item, index) => {
                expect(item instanceof Integer).toBe(true);
                expect(item.value).toBe(index + 1);
            });
        });

        test('It throws an error if the type is not the same', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            const other = new Collection(Float, [new Float(4), new Float(5), new Float(6)]);

            // @ts-expect-error Type error expected
            expect(() => collection.concat(other)).toThrowError();
        });
    });
});
