import { Type } from './type.js';

export abstract class BaseString<TType extends string = string> extends Type<TType> {
    protected validate(value: unknown): boolean {
        if (!(typeof value === 'string' || value instanceof String)) {
            return false;
        }

        const string = String(value);

        if (string.length < this.min()) {
            return false;
        }

        if (string.length > this.max()) {
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
