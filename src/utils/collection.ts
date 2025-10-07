import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import { Type, TypeOption } from '@/types/type.js';

export type CollectionOption = {
    immutable?: boolean;
};

const typeSymbol = Symbol('typ');
const valueSymbol = Symbol('value');

export class Collection<TType extends typeof Type<TypeOption, unknown>> {
    protected [typeSymbol]: TType;
    protected [valueSymbol]: InstanceType<TType>[] = [];

    public constructor(type: TType, value: InstanceType<TType>[] = []) {
        this[typeSymbol] = type;
        value.forEach((item) => this.push(item));
    }

    public get type() {
        return this[typeSymbol];
    }

    public concat(other: Collection<TType>) {
        if (this.type !== other.type) {
            throw new TypeVaultValidationError();
        }

        other.toArray().forEach((item) => this.push(item));
    }

    public every(callback: (item: InstanceType<TType>) => boolean) {
        return this[valueSymbol].every(callback);
    }

    public filter(callback: (item: InstanceType<TType>) => boolean) {
        return new Collection(this.type, this[valueSymbol].filter(callback));
    }

    public find(callback: (item: InstanceType<TType>) => boolean) {
        return this[valueSymbol].find(callback);
    }

    public findIndex(callback: (item: InstanceType<TType>) => boolean) {
        return this[valueSymbol].findIndex(callback);
    }

    public forEach(
        callback: (item: InstanceType<TType>, index: number, array: InstanceType<TType>[]) => void
    ) {
        this[valueSymbol].forEach(callback);
    }

    public push(item: InstanceType<TType>) {
        if (!(item instanceof this.type)) {
            throw new TypeVaultValidationError();
        }

        this[valueSymbol].push(item);
    }

    public includes(item: InstanceType<TType>) {
        return this[valueSymbol].includes(item);
    }

    public indexOf(item: InstanceType<TType>) {
        return this[valueSymbol].indexOf(item);
    }

    public lastIndexOf(item: InstanceType<TType>) {
        return this[valueSymbol].lastIndexOf(item);
    }

    public toArray() {
        return this[valueSymbol];
    }
}
