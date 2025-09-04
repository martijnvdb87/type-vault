import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';

export type TypeOption = {
    nullable?: boolean;
    immutable?: boolean;
};

export type TypeValue<
    TOptions extends { nullable?: boolean },
    TValue,
> = TOptions['nullable'] extends true ? TValue | null : TValue;

export type SetTypeValue<
    TOptions extends { nullable?: boolean; immutable?: boolean },
    TValue,
> = TOptions['immutable'] extends true
    ? never
    : TOptions['nullable'] extends true
      ? TValue | null
      : TValue;

export abstract class Type<TOption extends TypeOption, TValue> {
    declare protected _value: TypeValue<TOption, TValue>;
    protected _options: TypeOption;

    public constructor(value: TypeValue<TOption, TValue>, options?: TOption) {
        this._options = options ?? { nullable: false };

        this.value = value as SetTypeValue<TOption, TValue>;
    }

    public get value(): TypeValue<TOption, TValue> {
        return this._value as TypeValue<TOption, TValue>;
    }

    public set value(value: SetTypeValue<TOption, TValue>) {
        if (value === undefined) {
            throw new TypeVaultValidationError();
        }

        if (this._options.immutable && this._value !== undefined) {
            throw new TypeVaultValidationError();
        }

        if (this._options.nullable && value === null) {
            this._value = null as TypeValue<TOption, TValue>;

            return;
        }

        const modifiedValue = this.modifier(value);

        if (!this.validate(modifiedValue)) {
            throw new TypeVaultValidationError();
        }

        this._value = modifiedValue;
    }

    public toString(): string {
        return this.value?.toString() ?? '';
    }

    public toJSON(): TypeValue<TOption, TValue> {
        return this.value;
    }

    public valueOf(): TypeValue<TOption, TValue> {
        return this.value;
    }

    protected modifier(value: unknown): TypeValue<TOption, TValue> {
        return value as TypeValue<TOption, TValue>;
    }

    protected abstract validate(value: unknown): boolean;
}
