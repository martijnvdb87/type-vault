import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export abstract class Color<
    TOptions extends TypeOption = TypeOption,
    TValue extends string = string,
> extends BaseString<TOptions, TValue> {}
