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
}
