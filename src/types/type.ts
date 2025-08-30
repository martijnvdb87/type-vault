import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';

export abstract class Type<TValue> {
    protected _value: TValue | undefined = undefined;

    public constructor(value: TValue | void) {
        this.value = value as TValue;
    }

    public get value(): TValue {
        if (this._value === undefined) {
            return this.default();
        }

        return this._value;
    }

    public set value(value: TValue) {
        if (value === undefined || value === null) {
            this._value = undefined;

            return;
        }

        const modifiedValue = this.modifier(value);

        if (!this.validate(modifiedValue)) {
            throw new TypeVaultValidationError();
        }

        this._value = modifiedValue;
    }

    public get rawValue(): TValue | undefined {
        return this._value;
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
}
