import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { BaseNumber } from './baseNumber.js';

export class Integer extends BaseNumber {
    protected modifier(value: unknown): number {
        if (!(typeof value === 'number' || value instanceof Number)) {
            throw new TypeVaultValidationError();
        }

        return Math.floor(Number(value));
    }
}
