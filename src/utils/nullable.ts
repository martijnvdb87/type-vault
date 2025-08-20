import { Type } from '@/types/type.js';

type Value<TType extends typeof Type> = TType['prototype']['value'];

export class Nullable<TType extends { new (value: Value<TType>): Type<Value<TType>> }> {
    protected _value: Value<TType> | null;
    protected readonly _type: TType;

    public constructor(type: TType, value: Value<TType> | null = null) {
        this._type = type;
        this._value = value === null ? null : new this._type(value);
    }

    public get value(): Value<TType> | null {
        return this._value === null ? null : (this._value?.value ?? null);
    }

    public set value(value: Value<TType> | null) {
        this._value = value === null ? null : new this._type(value);
    }

    public get type(): TType {
        return this._type;
    }
}
