import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';

type TypeOptions = { nullable?: boolean; immutable?: boolean };

export abstract class Type<TValue> {
    protected _value!: TValue;
    protected _nullable: boolean;
    protected _immutable: boolean;

    public constructor(
        value: Type<TValue> | TValue | undefined = undefined,
        options: TypeOptions = {}
    ) {
        this._nullable = Boolean(options?.nullable ?? false);
        this._immutable = Boolean(options?.immutable ?? false);

        this.value = value;
    }

    public get value(): TValue {
        return this._value;
    }

    public set value(value: Type<TValue> | TValue | undefined) {
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

    public static from<TType extends Type<TType['value']>>(
        this: new (value: TType['value']) => TType,
        value: TType['value']
    ): TType {
        return new this(value);
    }

    public static options<TType extends Type<TType['value']>>(
        this: new (value: TType['value'], options?: TypeOptions) => TType,
        options: {
            nullable?: boolean;
            immutable?: boolean;
        }
    ) {
        return {
            from: (value: TType['value']) => {
                return new this(value, options);
            },
        };
    }
}
