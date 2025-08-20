import { Type } from './type.js';

export abstract class BaseBoolean<TValue = boolean> extends Type<TValue> {
    protected default(): TValue {
        return false as TValue;
    }

    public validate(value: unknown): boolean {
        if (!(typeof value === 'boolean' || value instanceof Boolean)) {
            return false;
        }

        return true;
    }
}
