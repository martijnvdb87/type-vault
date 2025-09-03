import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';

export abstract class Type<TValue> {
    protected _value: TValue | null = null;

    public constructor(value: TValue) {
        this.value = value as TValue;
    }

    public get value(): TValue {
        return this._value as TValue;
    }

    public set value(value: TValue) {
        if (value === null) {
            this._value = null;

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
}
