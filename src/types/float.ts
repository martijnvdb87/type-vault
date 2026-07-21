import { BaseNumber } from './baseNumber.js';
import { TypeOption } from './type.js';

export class Float<TOptions extends TypeOption = TypeOption> extends BaseNumber<TOptions> {}
