import { BaseString } from './baseString.js';

export abstract class NullableBaseString<TValue = string | null> extends BaseString<TValue> {
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
