import { BaseNumber } from './baseNumber.js';
import { TypeOption } from './type.js';

export class Year<TOptions extends TypeOption = TypeOption> extends BaseNumber<number, TOptions> {
    protected min(): number {
        return 0;
    }

    protected max(): number {
        return 9999;
    }
}
