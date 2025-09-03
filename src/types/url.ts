import * as z from 'zod/mini';
import { BaseString } from './baseString.js';

export class Url extends BaseString {
    protected validate(value: unknown): boolean {
        return z.url().safeParse(value).success;
    }
}
