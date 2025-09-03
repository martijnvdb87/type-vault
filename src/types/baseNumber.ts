import { Type } from './type.js';

export abstract class BaseNumber<TType extends number = number> extends Type<TType> {
    protected validate(value: unknown): boolean {
        if (!(typeof value === 'number' || value instanceof Number)) {
            return false;
        }

        const number = Number(value);

        if (Number.isNaN(number)) {
            return false;
        }

        if (!Number.isFinite(number)) {
            return false;
        }

        if (number < Number.MIN_SAFE_INTEGER) {
            return false;
        }

        if (number > Number.MAX_SAFE_INTEGER) {
            return false;
        }

        return true;
    }

    protected min(): number {
        return Number.MIN_SAFE_INTEGER;
    }

    protected max(): number {
        return Number.MAX_SAFE_INTEGER;
    }
}
