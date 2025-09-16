import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';

export function assertClamp(value: number, options: { min: number; max: number }) {
    if (typeof value !== 'number') {
        throw new TypeVaultValidationError('Value must be a number');
    }

    if (value < options.min || value > options.max) {
        throw new TypeVaultValidationError(
            `Value must be between ${options.min} and ${options.max}`
        );
    }

    return value;
}
