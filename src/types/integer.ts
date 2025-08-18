import { Type } from './type.js';

export class Integer extends Type<number> {
    protected default(): number {
        return 0;
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

    protected modifier(value: number): number {
        return Math.floor(value);
    }
}
