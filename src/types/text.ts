import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class Text<TOptions extends TypeOption = TypeOption> extends BaseString<TOptions> {}
