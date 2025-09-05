import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { BaseNumber } from './baseNumber.js';
import { TypeOption } from './type.js';

export class Integer<TOptions extends TypeOption = TypeOption> extends BaseNumber<TOptions> {
    protected modifier(value: unknown): number {
        if (!(typeof value === 'number' || value instanceof Number)) {
            throw new TypeVaultValidationError();
        }

        return Math.floor(Number(value));
    }

    public static nullable(value: number | null = null) {
        return new Integer(value, { nullable: true });
    }

    public static immutable(value: number) {
        return new Integer(value, { immutable: true });
    }
}
