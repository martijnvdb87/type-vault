import { Type, TypeOption } from './type.js';

export abstract class BaseBoolean<
    TOption extends TypeOption,
    TType extends boolean = boolean,
> extends Type<TOption, TType> {
    protected validate(value: unknown): boolean {
        if (!(typeof value === 'boolean' || value instanceof Boolean)) {
            return false;
        }

        return true;
    }
}
