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

    describe('Every method', () => {
        test('It returns true', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            expect(collection.every((item) => item.value < 4)).toBe(true);
        });

        test('It returns false', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            expect(collection.every((item) => item.value > 2)).toBe(false);
        });
    });

    describe('Filter method', () => {
        test('It returns filtered collection', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            const filtered = collection.filter((item) => item.value < 3);

            expect(filtered.type).toBe(Integer);
            expect(filtered.toArray()).toEqual([new Integer(1), new Integer(2)]);
        });
    });

    describe('Find method', () => {
        test('It returns found item', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            const found = collection.find((item) => item.value === 2);

            expect(found instanceof Integer).toBe(true);
            expect(found?.value).toBe(2);
        });

        test('It returns undefined if not found', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            const found = collection.find((item) => item.value === 4);

            expect(found).toBeUndefined();
        });
    });

    describe('FindIndex method', () => {
        test('It returns found index', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            const found = collection.findIndex((item) => item.value === 2);

            expect(found).toBe(1);
        });

        test('It returns -1 if not found', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            const found = collection.findIndex((item) => item.value === 4);

            expect(found).toBe(-1);
        });
    });

    describe('ForEach method', () => {
        test('It calls the callback', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            collection.forEach((item, index, array) => {
                expect(item instanceof Integer).toBe(true);
                expect(item.value).toBe(index + 1);
                expect(array).toBe(collection.toArray());
            });
        });
    });

    describe('Includes method', () => {
        test('It returns true', () => {
            const item = new Integer(2);

            const collection = new Collection(Integer, [
                new Integer(1),
                item,
                new Integer(3),
                item,
            ]);

            expect(collection.includes(item)).toBe(true);
        });

        test('It returns false', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            expect(collection.includes(new Integer(4))).toBe(false);
        });
    });

    describe('IndexOf method', () => {
        test('It returns found index', () => {
            const item = new Integer(2);

            const collection = new Collection(Integer, [
                new Integer(1),
                item,
                new Integer(3),
                item,
            ]);

            const found = collection.indexOf(item);

            expect(found).toBe(1);
        });

        test('It returns -1 if not found', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            const found = collection.indexOf(new Integer(4));

            expect(found).toBe(-1);
        });
    });

    describe('LastIndexOf method', () => {
        test('It returns found index', () => {
            const item = new Integer(2);

            const collection = new Collection(Integer, [
                new Integer(1),
                item,
                new Integer(3),
                item,
            ]);

            const found = collection.lastIndexOf(item);

            expect(found).toBe(3);
        });

        test('It returns -1 if not found', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            const found = collection.lastIndexOf(new Integer(4));

            expect(found).toBe(-1);
        });
    });

    describe('Map method', () => {
        test('It calls the callback', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            const mapped = collection.map((item) => item.value);

            expect(mapped).toEqual([1, 2, 3]);
        });
    });

    describe('Pop method', () => {
        test('It returns the last item', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            const item = collection.pop();

            expect(item instanceof Integer).toBe(true);
            expect(item?.value).toBe(3);

            expect(collection.length()).toEqual(2);
        });
    });

    describe('Length method', () => {
        test('It returns the length', () => {
            const collection = new Collection(Integer, [
                new Integer(1),
                new Integer(2),
                new Integer(3),
            ]);

            expect(collection.length()).toEqual(3);
        });
    });
});
