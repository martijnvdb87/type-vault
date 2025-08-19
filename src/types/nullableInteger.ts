import { NullableBaseNumber } from './nullableBaseNumber.js';

export class NullableInteger extends NullableBaseNumber {
    protected modifier(value: number | null): number | null {
        if (value === null) {
            return null;
        }

        return Math.floor(value);
    }
}
