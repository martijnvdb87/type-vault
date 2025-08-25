import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';

type TypeOptions = { nullable?: boolean; immutable?: boolean };

const typeFrom = Symbol('typeFrom');

export abstract class Type<TValue, TFrom = TValue | void> {
    declare protected _value: TValue | null;
    protected _nullable: boolean;
    protected _immutable: boolean;

    declare public [typeFrom]: TFrom | null;

    public constructor(value: Type<TValue, TFrom> | TFrom | null, options?: TypeOptions) {
        if (value === null && options?.nullable === false) {
            throw new TypeVaultValidationError();
        }

        this._nullable = Boolean(value === null || (options?.nullable ?? false));
        this._immutable = Boolean(options?.immutable ?? false);

        this.value = value as TValue;
    }

    public get value(): TValue {
        return this._value as TValue;
    }

    public set value(value: Type<TValue> | TValue | void) {
        if (this._immutable && this.value !== undefined) {
            throw new TypeVaultValidationError();
        }

        if (this._nullable && value === null) {
            this._value = value;

            return;
        }

        if (this._nullable && value === undefined) {
            this._value = null;

            return;
        }

        if (value === undefined) {
            value = this.default();
        }

        if (value instanceof Type) {
            value = value.value;
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

    public toJSON(): TValue {
        return this.value;
    }

    public valueOf(): TValue {
        return this.value;
    }

    protected modifier(value: unknown): TValue {
        return value as TValue;
    }

    protected abstract validate(value: unknown): boolean;
    protected abstract default(): TValue;

    public static from<TType extends Type<TType['value'], TType[typeof typeFrom]>>(
        this: new (value: TType['value']) => TType,
        value: TType[typeof typeFrom]
    ): TType {
        return new this(value);
    }

    public static options<TType extends Type<TType['value'], TType[typeof typeFrom]>>(
        this: new (value: TType[typeof typeFrom], options?: TypeOptions) => TType,
        options: {
            nullable?: boolean;
            immutable?: boolean;
        }
    ) {
        return {
            from: (value: TType[typeof typeFrom]) => {
                return new this(value, options);
            },
        };
    }
}
