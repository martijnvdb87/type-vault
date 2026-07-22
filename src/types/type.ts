import { ImmutableValueError } from '../errors/immutableValueError.js';
import { InvalidTypeError } from '../errors/invalidTypeError.js';
import { TypeVaultError } from '../errors/typeVaultError.js';
import { TypeVaultValidationError } from '../errors/typeVaultValidationError.js';

export type TypeOption = {
    immutable?: boolean;
};

export type TypeValue<TValue, TOptions extends TypeOption> = [TOptions] extends [TypeOption]
    ? TValue
    : TValue;

export type SetTypeValue<TOptions extends TypeOption, TValue> = TOptions['immutable'] extends true
    ? never
    : TValue;

const valueSymbol = Symbol('value');
const optionsSymbol = Symbol('options');

type TypeConstructor<TInstance extends Type<unknown, TypeOption>> = new (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    options?: TypeOption
) => TInstance;

export abstract class Type<TValue, TOption extends TypeOption = TypeOption> {
    declare protected [valueSymbol]: TypeValue<TValue, TOption>;
    protected [optionsSymbol]: TypeOption;

    public constructor(value: TypeValue<TValue, TOption>, options?: TOption) {
        this[optionsSymbol] = options ?? { immutable: false };

        this.value = value as SetTypeValue<TOption, TValue>;
    }

    public static immutable<TConstructor extends TypeConstructor<Type<unknown, TypeOption>>>(
        this: TConstructor,
        value: ConstructorParameters<TConstructor>[0]
    ): InstanceType<TConstructor> {
        return new this(value, { immutable: true }) as InstanceType<TConstructor>;
    }

    public static isValid<TConstructor extends TypeConstructor<Type<unknown, TypeOption>>>(
        this: TConstructor,
        value: unknown
    ): boolean {
        try {
            new this(value as ConstructorParameters<TConstructor>[0]);

            return true;
        } catch (error) {
            if (error instanceof TypeVaultError) {
                return false;
            }

            throw error;
        }
    }

    public get options(): TypeOption {
        return this[optionsSymbol];
    }

    public get value(): TypeValue<TValue, TOption> {
        return this.dangerouslyModifyGetValue(this[valueSymbol]);
    }

    public set value(value: SetTypeValue<TOption, TValue>) {
        if (value === undefined || value === null) {
            throw new InvalidTypeError();
        }

        if (this.value !== undefined) {
            this.assertMutable();
        }

        const modifiedValue = this.modifier(value);

        if (!this.validate(modifiedValue)) {
            throw new InvalidTypeError();
        }

        this[valueSymbol] = this.dangerouslyModifySetValue(modifiedValue);
    }

    public isImmutable(): boolean {
        return Boolean(this[optionsSymbol].immutable);
    }

    public equals(other: unknown): boolean {
        return other instanceof this.constructor && this.valueOf() === other.valueOf();
    }

    public assertEquals(other: unknown): asserts other is this {
        if (!this.equals(other)) {
            throw new TypeVaultValidationError('Values are not equal');
        }
    }

    public toString(): string {
        return this.value?.toString() ?? '';
    }

    public toJSON(): TypeValue<TValue, TOption> {
        return this.value;
    }

    public valueOf(): TypeValue<TValue, TOption> {
        return this.value;
    }

    protected modifier(value: unknown): TypeValue<TValue, TOption> {
        return value as TypeValue<TValue, TOption>;
    }

    protected dangerouslyModifyGetValue(
        value: TypeValue<TValue, TOption>
    ): TypeValue<TValue, TOption> {
        return value;
    }

    protected dangerouslyModifySetValue(value: unknown) {
        return value as TypeValue<TValue, TOption>;
    }

    protected assertMutable() {
        if (this.isImmutable()) {
            throw new ImmutableValueError();
        }
    }

    protected abstract validate(value: unknown): boolean;
}
