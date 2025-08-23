import * as z from 'zod/mini';
import { BaseString } from './baseString.js';

export class EmailAddress extends BaseString<string> {
    protected validate(value: unknown): boolean {
        return z.email().safeParse(value).success;
    }
}
