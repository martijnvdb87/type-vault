import { InvalidTypeError } from '@/errors/invalidTypeError.js';
import { BaseNumber } from './baseNumber.js';
import { TypeOption } from './type.js';

export class Integer<TOptions extends TypeOption = TypeOption> extends BaseNumber<number, TOptions> {
    protected modifier(value: unknown): number {
        if (!(typeof value === 'number' || value instanceof Number)) {
            throw new InvalidTypeError();
        }

        return Math.floor(Number(value));
    }
}
