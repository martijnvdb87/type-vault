import { InvalidPropertyError } from '@/errors/invalidPropertyError.js';

export function assertClamp(value: number, options: { min: number; max: number }) {
    if (typeof value !== 'number') {
        throw new InvalidPropertyError('Value must be a number');
    }

    if (value < options.min || value > options.max) {
        throw new InvalidPropertyError(`Value must be between ${options.min} and ${options.max}`);
    }

    return value;
}
