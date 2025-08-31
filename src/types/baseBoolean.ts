import { Type } from './type.js';

export abstract class BaseBoolean<TType extends boolean = boolean> extends Type<TType> {
    protected default() {
        return false as TType;
    }

    protected validate(value: unknown): boolean {
        if (!(typeof value === 'boolean' || value instanceof Boolean)) {
            return false;
        }

        return true;
    }
}
