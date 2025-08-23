import { Type } from './type.js';

export abstract class BaseBoolean<TFrom = boolean | void> extends Type<boolean, TFrom> {
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
