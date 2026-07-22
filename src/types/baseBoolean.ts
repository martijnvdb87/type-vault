import { Type, TypeOption } from './type.js';

export abstract class BaseBoolean<
    TType extends boolean = boolean,
    TOption extends TypeOption = TypeOption,
> extends Type<TType, TOption> {
    protected validate(value: unknown): boolean {
        if (!(typeof value === 'boolean' || value instanceof Boolean)) {
            return false;
        }

        return true;
    }
}
