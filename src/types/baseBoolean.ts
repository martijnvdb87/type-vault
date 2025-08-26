import { Type } from './type.js';

export abstract class BaseBoolean extends Type<boolean> {
    protected default() {
        return false;
    }

    protected validate(value: unknown): boolean {
        if (!(typeof value === 'boolean' || value instanceof Boolean)) {
            return false;
        }

        return true;
    }
}
