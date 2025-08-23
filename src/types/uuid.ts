import { validate } from 'uuid';
import { BaseString } from './baseString.js';

export class Uuid extends BaseString<string> {
    protected validate(value: unknown): boolean {
        return super.validate(value) && validate(value);
    }

    public static nil(): Uuid {
        return new Uuid('00000000-0000-0000-0000-000000000000');
    }
}
