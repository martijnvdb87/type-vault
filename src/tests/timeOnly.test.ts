import { DateTimeUnit } from '@/enum/dateTimeUnit.js';
import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { TimeOnly } from '@/types/timeOnly.js';
import { TimeOnlyString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';

describe('TimeOnly class', () => {
    test('It sets the correct now value', () => {
        const { value } = TimeOnly.now();
        const timeOnly = new TimeOnly(value);

        expect(timeOnly.value).toBe(value);
    });

    test('It sets the correct value', () => {
        const value = '12:34:56.789';
        const timeOnly = new TimeOnly(value);

        expect(timeOnly.value).toBe(value);
    });

    test('It throws an error if the value is not a string', () => {
        const values = [1, {}, true, false, [], [1, 2, 3], { foo: 'bar' }, BigInt(1)];

        for (const value of values) {
            expect(() => new TimeOnly(value as unknown as TimeOnlyString)).toThrowError(
                TypeVaultValidationError
            );
        }
    });

    test('It throws an error if the value is not a valid date', () => {
        expect(() => new TimeOnly('foo' as unknown as TimeOnlyString)).toThrowError(
            TypeVaultValidationError
        );
    });

    test('It returns the correct values', () => {
        const value = '12:34:56.789';
        const timeOnly = new TimeOnly(value);

        expect(timeOnly.hour).toBe(12);
        expect(timeOnly.minute).toBe(34);
        expect(timeOnly.second).toBe(56);
        expect(timeOnly.millisecond).toBe(789);
    });

    test('It updates the value', () => {
        const value = '12:34:56.789';
        const timeOnly = new TimeOnly(value);

        expect(timeOnly.hour).toBe(12);
        expect(timeOnly.minute).toBe(34);
        expect(timeOnly.second).toBe(56);
        expect(timeOnly.millisecond).toBe(789);

        timeOnly.value = '23:45:12.345';
        expect(timeOnly.hour).toBe(23);
        expect(timeOnly.minute).toBe(45);
        expect(timeOnly.second).toBe(12);
        expect(timeOnly.millisecond).toBe(345);
    });

    test('It updates the date/time properties', () => {
        const value = '12:34:56.789';
        const timeOnly = new TimeOnly(value);

        timeOnly.hour = 23;
        timeOnly.minute = 45;
        timeOnly.second = 12;
        timeOnly.millisecond = 345;

        expect(timeOnly.hour).toBe(23);
        expect(timeOnly.minute).toBe(45);
        expect(timeOnly.second).toBe(12);
        expect(timeOnly.millisecond).toBe(345);
    });

    test('It sets using an object', () => {
        const value = '12:34:56.789';
        const timeOnly = new TimeOnly(value);

        timeOnly.set({ hour: 23, minute: 45, second: 12, millisecond: 345 });

        expect(timeOnly.hour).toBe(23);
        expect(timeOnly.minute).toBe(45);
        expect(timeOnly.second).toBe(12);
        expect(timeOnly.millisecond).toBe(345);
    });

    test('It adds to the date/time', () => {
        const value = '12:34:56.789';
        const timeOnly = new TimeOnly(value);

        timeOnly.add({ hour: 1, minute: 1, second: 1, millisecond: 1 });

        expect(timeOnly.hour).toBe(13);
        expect(timeOnly.minute).toBe(35);
        expect(timeOnly.second).toBe(57);
        expect(timeOnly.millisecond).toBe(790);
    });

    test('It subtracts from the date/time', () => {
        const value = '12:34:56.789';
        const timeOnly = new TimeOnly(value);

        timeOnly.subtract({ hour: 1, minute: 1, second: 1, millisecond: 1 });

        expect(timeOnly.hour).toBe(11);
        expect(timeOnly.minute).toBe(33);
        expect(timeOnly.second).toBe(55);
        expect(timeOnly.millisecond).toBe(788);
    });

    test('It formats the date/time', () => {
        const value = '12:34:56.789';
        const timeOnly = new TimeOnly(value);

        expect(timeOnly.format('HH:mm:ss.SSS')).toBe('12:34:56.789');
        expect(timeOnly.format('HH:mm:ss')).toBe('12:34:56');
    });

    test('It returns the difference', () => {
        const value = '12:34:56.789';
        const timeOnly = new TimeOnly(value);

        expect(timeOnly.difference(new TimeOnly('12:34:56.788'), DateTimeUnit.Millisecond)).toBe(1);
        expect(timeOnly.difference(new TimeOnly('12:34:52.789'), DateTimeUnit.Second)).toBe(4);
        expect(timeOnly.difference(new TimeOnly('12:37:56.789'), DateTimeUnit.Minute)).toBe(-3);
        expect(timeOnly.difference(new TimeOnly('15:34:56.789'), DateTimeUnit.Hour)).toBe(-3);
    });
});
