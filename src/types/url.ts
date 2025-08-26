import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import * as z from 'zod/mini';
import { BaseString } from './baseString.js';

export class Url extends BaseString {
    public constructor(value: string) {
        if (!validate(value)) {
            throw new TypeVaultValidationError();
        }

        super(value);
    }

    public default(): string {
        throw new TypeVaultValidationError();
    }

    protected validate(value: unknown): boolean {
        return validate(value);
    }
}

function validate(value: unknown): boolean {
    return z.url().safeParse(value).success;
}
