import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Email as EmailPattern } from '@/utils/types.js';
import * as z from 'zod/mini';
import { BaseString } from './baseString.js';

export class Email extends BaseString {
    public constructor(value: EmailPattern) {
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
