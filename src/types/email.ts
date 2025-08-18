import * as z from 'zod/mini';
import { BaseString } from './baseString.js';

export class Email extends BaseString {
    public constructor(value: string) {
        super(value);
    }

    protected validate(value: unknown): boolean {
        return z.email().safeParse(value).success;
    }
}
