import { validate } from 'uuid';
import { BaseString } from './baseString.js';

export class Uuid extends BaseString {
    public constructor(value: string) {
        super(value);
    }

    protected validate(value: unknown): boolean {
        if (!(typeof value === 'string' || value instanceof String)) {
            return false;
        }

        return validate(value);
    }

    public static nil(): Uuid {
        return new Uuid('00000000-0000-0000-0000-000000000000');
    }
}
