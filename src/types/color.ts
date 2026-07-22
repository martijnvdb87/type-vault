import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export abstract class Color<
    TValue extends string = string,
    TOptions extends TypeOption = TypeOption,
> extends BaseString<TValue, TOptions> {}
