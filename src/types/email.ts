import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import * as z from 'zod/mini';
import { BaseString } from './baseString.js';

export class Email extends BaseString {
    public constructor(value: string) {
        if (!validate(value)) {
            throw new TypeVaultValidationError();
        }

        super(value);
    }

    protected validate(value: unknown): boolean {
        return validate(value);
    }
}

function validate(value: unknown): boolean {
    return z.email().safeParse(value).success;
}
