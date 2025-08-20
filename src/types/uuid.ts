import { validate } from 'uuid';
import { BaseString } from './baseString.js';

export class Uuid extends BaseString {
    public constructor(value: string) {
        super(value);
    }

    public validate(value: unknown): boolean {
        if (!(typeof value === 'string' || value instanceof String)) {
            return false;
        }

        return validate(value);
    }
}
