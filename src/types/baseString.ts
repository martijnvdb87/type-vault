import { Type } from './type.js';

export abstract class BaseString<TValue = string> extends Type<TValue> {
    protected default(): TValue {
        return '' as TValue;
    }

    protected validate(value: unknown): boolean {
        if (!(typeof value === 'string' || value instanceof String)) {
            return false;
        }

        return true;
    }

    protected min(): number {
        return 0;
    }

    protected max(): number {
        return Number.MAX_SAFE_INTEGER;
    }
}
