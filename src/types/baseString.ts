import { Type } from './type.js';

export abstract class BaseString extends Type<string> {
    protected default(): string {
        return '';
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
