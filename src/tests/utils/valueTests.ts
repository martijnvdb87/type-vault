import { expect, test } from 'vitest';

type Type = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any): {
        value: unknown;
        toJSON(): unknown;
    };
};

export function valueTests<TType extends Type>(options: { type: TType; validValue: unknown }) {
    const { type, validValue } = options;

    test('It returns a string when toString is called', () => {
        expect(new type(validValue).toString()).toBe(String(validValue));
    });

    test('It returns a number when valueOf is called', () => {
        expect(new type(validValue).valueOf()).toBe(validValue);
    });

    test('It returns a number when toJSON is called', () => {
        expect(new type(validValue).toJSON()).toBe(validValue);
    });
}
