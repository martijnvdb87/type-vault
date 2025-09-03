import { validate } from 'uuid';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class Uuid<TOptions extends TypeOption = TypeOption> extends BaseString<TOptions> {
    protected validate(value: unknown): boolean {
        return super.validate(value) && validate(value);
    }

    public static nil(): Uuid {
        return new Uuid('00000000-0000-0000-0000-000000000000');
    }
}

const yay = new Uuid('00000000-0000-0000-0000-000000000000', { nullable: true, immutable: false });
yay.value = null;
