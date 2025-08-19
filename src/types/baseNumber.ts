import { Type } from './type.js';

export abstract class BaseNumber<TValue = number> extends Type<TValue> {
    protected default(): TValue {
        return 0 as TValue;
    }

    protected validate(value: unknown): boolean {
        if (!(typeof value === 'number' || value instanceof Number)) {
            return false;
        }

        if (Number.isNaN(value)) {
            return false;
        }

        if (!Number.isFinite(value)) {
            return false;
        }

        if ((value as number) < Number.MIN_SAFE_INTEGER) {
            return false;
        }

        if ((value as number) > Number.MAX_SAFE_INTEGER) {
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
