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

const valueSymbol = Symbol('value');
const optionsSymbol = Symbol('options');

export abstract class Type<TOption extends TypeOption, TValue> {
    declare protected [valueSymbol]: TypeValue<TOption, TValue>;
    protected [optionsSymbol]: TypeOption;

    public constructor(value: TypeValue<TOption, TValue>, options?: TOption) {
        this[optionsSymbol] = options ?? { nullable: false };

        this.value = value as SetTypeValue<TOption, TValue>;
    }

    public get value(): TypeValue<TOption, TValue> {
        return this.dangerouslyGetValue();
    }

    public set value(value: SetTypeValue<TOption, TValue>) {
        if (value === undefined) {
            throw new TypeVaultValidationError();
        }

        if (this[optionsSymbol].immutable && this.dangerouslyGetValue() !== undefined) {
            throw new TypeVaultValidationError();
        }

        if (this[optionsSymbol].nullable && value === null) {
            this.dangerouslySetValue(null);

            return;
        }

        const modifiedValue = this.modifier(value);

        if (!this.validate(modifiedValue)) {
            throw new TypeVaultValidationError();
        }

        this.dangerouslySetValue(modifiedValue);
    }

    public isNullable(): boolean {
        return Boolean(this[optionsSymbol].nullable);
    }

    public isImmutable(): boolean {
        return Boolean(this[optionsSymbol].immutable);
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

    protected dangerouslyGetValue(): TypeValue<TOption, TValue> {
        return this[valueSymbol];
    }

    protected dangerouslySetValue(value: unknown) {
        this[valueSymbol] = value as TypeValue<TOption, TValue>;
    }

    protected abstract validate(value: unknown): boolean;
}
