import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Uuid } from '@/types/uuid.js';
import { Uuidv1 } from '@/types/uuidv1.js';
import { Uuidv3 } from '@/types/uuidv3.js';
import { Uuidv4 } from '@/types/uuidv4.js';
import { Uuidv5 } from '@/types/uuidv5.js';
import { Uuidv6 } from '@/types/uuidv6.js';
import { Uuidv7 } from '@/types/uuidv7.js';
import { UuidString } from '@/utils/types.js';
import { describe, expect, test } from 'vitest';
import { nullableTests } from './utils/nullableTests.js';

describe('Uuid class', () => {
    test('It sets the value to the given UUID', () => {
        Object.values(values)
            .flat()
            .forEach((value) => {
                expect(new Uuid(value).value).toBe(value);
            });
    });

    test('It should throw an error if the value is not a valid UUID', () => {
        expect(() => new Uuid('example' as unknown as UuidString)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new Uuid('example.' as unknown as UuidString)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new Uuid(undefined as unknown as UuidString)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new Uuid(1 as unknown as UuidString)).toThrowError(TypeVaultValidationError);
        expect(() => new Uuid({} as unknown as UuidString)).toThrowError(TypeVaultValidationError);
        expect(() => new Uuid([] as unknown as UuidString)).toThrowError(TypeVaultValidationError);
        expect(() => new Uuid(true as unknown as UuidString)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new Uuid(false as unknown as UuidString)).toThrowError(
            TypeVaultValidationError
        );
        expect(() => new Uuid(BigInt(1) as unknown as UuidString)).toThrowError(
            TypeVaultValidationError
        );
    });

    test('It returns a nil UUID', () => {
        expect(Uuid.nil().value).toBe('00000000-0000-0000-0000-000000000000');
    });

    nullableTests({ type: Uuid, validValue: values.v1[0], invalidValue: 'not-valid' });
});

describe('Uuidv1 class', () => {
    const { filtered, rest } = filterUuidTypes('v1');

    test('It sets the value to the given UUID', () => {
        filtered.forEach((value) => {
            expect(new Uuidv1(value).value).toBe(value);
        });
    });

    test('It should throw an error if the value is not a valid UUID v1', () => {
        rest.forEach((value) => {
            expect(() => new Uuidv1(value)).toThrowError(TypeVaultValidationError);
        });
    });

    test('It returns a random UUIDv1', () => {
        const uuid = Uuidv1.random().value;

        expect(new Uuidv1(uuid).value).toBe(uuid);
    });

    nullableTests({ type: Uuidv1, validValue: values.v1[0], invalidValue: 'not-valid' });
});

describe('Uuidv3 class', () => {
    const { filtered, rest } = filterUuidTypes('v3');

    test('It sets the value to the given UUID', () => {
        filtered.forEach((value) => {
            expect(new Uuidv3(value).value).toBe(value);
        });
    });

    test('It should throw an error if the value is not a valid UUID v3', () => {
        rest.forEach((value) => {
            expect(() => new Uuidv3(value)).toThrowError(TypeVaultValidationError);
        });
    });

    test('It returns a random UUIDv3', () => {
        const uuid = Uuidv3.random('foo', Uuidv4.random()).value;

        expect(new Uuidv3(uuid).value).toBe(uuid);
    });

    nullableTests({ type: Uuidv3, validValue: values.v3[0], invalidValue: 'not-valid' });
});

describe('Uuidv4 class', () => {
    const { filtered, rest } = filterUuidTypes('v4');

    test('It sets the value to the given UUID', () => {
        filtered.forEach((value) => {
            expect(new Uuidv4(value).value).toBe(value);
        });
    });

    test('It should throw an error if the value is not a valid UUID v4', () => {
        rest.forEach((value) => {
            expect(() => new Uuidv4(value)).toThrowError(TypeVaultValidationError);
        });
    });

    test('It returns a random UUIDv4', () => {
        const uuid = Uuidv4.random().value;

        expect(new Uuidv4(uuid).value).toBe(uuid);
    });

    nullableTests({ type: Uuidv4, validValue: values.v4[0], invalidValue: 'not-valid' });
});

describe('Uuidv5 class', () => {
    const { filtered, rest } = filterUuidTypes('v5');

    test('It sets the value to the given UUID', () => {
        filtered.forEach((value) => {
            expect(new Uuidv5(value).value).toBe(value);
        });
    });

    test('It should throw an error if the value is not a valid UUID v5', () => {
        rest.forEach((value) => {
            expect(() => new Uuidv5(value)).toThrowError(TypeVaultValidationError);
        });
    });

    test('It returns a random UUIDv5', () => {
        const uuid = Uuidv5.random('foo', Uuidv4.random()).value;

        expect(new Uuidv5(uuid).value).toBe(uuid);
    });

    nullableTests({ type: Uuidv5, validValue: values.v5[0], invalidValue: 'not-valid' });
});

describe('Uuidv6 class', () => {
    const { filtered, rest } = filterUuidTypes('v6');

    test('It sets the value to the given UUID', () => {
        filtered.forEach((value) => {
            expect(new Uuidv6(value).value).toBe(value);
        });
    });

    test('It should throw an error if the value is not a valid UUID v6', () => {
        rest.forEach((value) => {
            expect(() => new Uuidv6(value)).toThrowError(TypeVaultValidationError);
        });
    });

    test('It returns a random UUIDv6', () => {
        const uuid = Uuidv6.random().value;

        expect(new Uuidv6(uuid).value).toBe(uuid);
    });

    nullableTests({ type: Uuidv6, validValue: values.v6[0], invalidValue: 'not-valid' });
});

describe('Uuidv7 class', () => {
    const { filtered, rest } = filterUuidTypes('v7');

    test('It sets the value to the given UUID', () => {
        filtered.forEach((value) => {
            expect(new Uuidv7(value).value).toBe(value);
        });
    });

    test('It should throw an error if the value is not a valid UUID v7', () => {
        rest.forEach((value) => {
            expect(() => new Uuidv7(value)).toThrowError(TypeVaultValidationError);
        });
    });

    test('It returns a random UUIDv7', () => {
        const uuid = Uuidv7.random().value;

        expect(new Uuidv7(uuid).value).toBe(uuid);
    });

    nullableTests({ type: Uuidv7, validValue: values.v7[0], invalidValue: 'not-valid' });
});

const values = {
    v1: [
        '194d4682-7e01-11f0-8de9-0242ac120002',
        '194d4948-7e01-11f0-8de9-0242ac120002',
        '194d4a10-7e01-11f0-8de9-0242ac120002',
        '194d4aba-7e01-11f0-8de9-0242ac120002',
        '194d4b46-7e01-11f0-8de9-0242ac120002',
    ],
    v3: [
        '04b17534-4ca7-32b8-8f5f-565c709eaa4a',
        'ffa05d14-ca8b-38e0-b6db-f9b1633ea66e',
        '32c7906b-3f58-317d-8350-446432d7ce70',
        '16ce7098-b557-3507-a28f-f039e1380096',
        'ed8b6743-a6a3-3d7b-9b6e-352cfe2dff20',
    ],
    v4: [
        'bf1660e8-9454-4369-9055-1a923468ee29',
        '65b4d161-4b4d-4997-8fd4-42fb7fbe20fa',
        '8943183f-9736-4411-b5fa-38da29c77b39',
        'e094963a-f6e7-4474-8bbc-4be9dbfc9e2a',
        '2f052a9b-35a2-474a-a42b-1f4848f7d885',
    ],
    v5: [
        'ef347f16-7609-5f91-a8a2-3dbdc23f2152',
        'c0446deb-4ba8-577e-bc95-d218d7982aa8',
        '218de376-6e6e-504a-8a2c-c0253a2dd7ce',
        '337cedfe-415e-52e6-ad74-9fc25d1006a2',
        'e11df791-5430-5978-ba2f-5d83ceb2820a',
    ],
    v6: [
        '1f07e023-3db2-6680-8fae-03d5bc6ba172',
        '1f07e023-3db2-6681-8de5-f9b2173618b2',
        '1f07e023-3db2-6682-a819-8623a0d8b14e',
        '1f07e023-3db2-6683-84ee-4d1df0497dcb',
        '1f07e023-3db2-6684-b9e0-5a2d704c4e26',
    ],
    v7: [
        '0198c917-ef4f-7caa-a35a-2b31a672d12e',
        '0198c917-ef4f-7bdc-bcc8-af4bb5cdeadd',
        '0198c917-ef4f-74f4-b5ea-f186741a0bb6',
        '0198c917-ef4f-7124-9ca2-c9c965edb327',
        '0198c917-ef4f-7533-8c45-285083f7acbf',
    ],
} as const;

function filterUuidTypes(type: keyof typeof values) {
    const filtered = values[type];
    const rest = Object.entries(values)
        .filter(([key]) => key !== type)
        .flatMap(([, value]) => value);

    return {
        filtered,
        rest,
    };
}
