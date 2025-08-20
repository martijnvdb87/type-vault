import { EmailAddress } from '@/types/emailAddress.js';
import { Type } from '@/types/type.js';

type Value<TType extends typeof Type> = TType['prototype']['value'];

export class Nullable<TType extends { new (value: Value<TType>): Type<Value<TType>> }> {
    protected _value: Value<TType> | null;
    protected readonly _type: TType;

    public constructor(type: TType, value: Value<TType> | null = null) {
        this._type = type;
        this._value = value ? new this._type(value) : null;
    }

    public get value(): Value<TType> | null {
        return this._value ? this._value.value : null;
    }

    public set value(value: Value<TType> | null) {
        if (value === null) {
            this._value = null;
        } else {
            this._value = new this._type(value);
        }
    }

    public get type(): TType {
        return this._type;
    }
}

const nullableEmailAddress = new Nullable(EmailAddress);
nullableEmailAddress.value = null;
