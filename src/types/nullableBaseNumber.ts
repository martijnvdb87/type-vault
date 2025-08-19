import { BaseNumber } from './baseNumber.js';

export abstract class NullableBaseNumber<TValue = number | null> extends BaseNumber<TValue> {
    protected default(): TValue {
        return null as TValue;
    }

    protected validate(value: unknown): boolean {
        if (value === null) {
            return true;
        }

        return super.validate(value);
    }
}
