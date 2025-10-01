import { BaseNumber } from './baseNumber.js';
import { TypeOption } from './type.js';

export class Year<TOptions extends TypeOption = TypeOption> extends BaseNumber<TOptions> {
    protected min(): number {
        return 0;
    }

    protected max(): number {
        return 9999;
    }

    public static nullable(value: number | null = null) {
        return new Year(value, { nullable: true });
    }

    public static immutable(value: number) {
        return new Year(value, { immutable: true });
    }
}
