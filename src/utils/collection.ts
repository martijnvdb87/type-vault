import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Type, TypeOption } from '@/types/type.js';

export type CollectionOption = {
    immutable?: boolean;
};

const valueSymbol = Symbol('value');

export class Collection<TType extends typeof Type<TypeOption, unknown>> {
    declare protected [valueSymbol]: InstanceType<TType>[];

    public constructor(type: TType, value: InstanceType<TType>[] = []) {
        value.forEach((item) => this.push(item));
    }

    public push(item: InstanceType<TType>) {
        if (!(item instanceof Type)) {
            throw new TypeVaultValidationError();
        }

        this[valueSymbol].push(item);
    }
}
