import { BaseNumber } from './baseNumber.js';
import { TypeOption } from './type.js';

export class Percentage<TOptions extends TypeOption = TypeOption> extends BaseNumber<TOptions> {
    protected min(): number {
        return 0;
    }

    protected max(): number {
        return 1;
    }
}
