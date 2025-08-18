import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';

export abstract class Type<TValue> {
    protected _value!: TValue;

    public constructor(value: Type<TValue> | TValue | undefined = undefined) {
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

        if (!this.validate(value)) {
            throw new TypeVaultValidationError();
        }

        const modifiedValue = this.modifier(value);

        if (modifiedValue !== value && !this.validate(modifiedValue)) {
            throw new TypeVaultValidationError();
        }

        this._value = modifiedValue;
    }

    public toString(): string {
        return `${this.value}`;
    }

    public toJSON(): TValue {
        return this.value;
    }

    public valueOf(): TValue {
        return this.value;
    }

    protected modifier(value: TValue): TValue {
        return value;
    }

    protected abstract default(): TValue;
    protected abstract validate(value: unknown): boolean;
}
