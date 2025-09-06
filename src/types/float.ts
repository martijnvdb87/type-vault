import { BaseNumber } from './baseNumber.js';
import { TypeOption } from './type.js';

export class Float<TOptions extends TypeOption = TypeOption> extends BaseNumber<TOptions> {
    public static nullable(value: number | null = null) {
        return new Float(value, { nullable: true });
    }

    public static immutable(value: number) {
        return new Float(value, { immutable: true });
    }
}
