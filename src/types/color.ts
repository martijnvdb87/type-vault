import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export abstract class Color<
    TOptions extends TypeOption = TypeOption,
    TValue extends string = string,
> extends BaseString<TOptions, TValue> {
    public abstract get alpha(): number;

    public getNormalizedAlpha() {
        return this.alpha;
    }
}
