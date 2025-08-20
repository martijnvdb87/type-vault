import * as z from 'zod/mini';
import { BaseString } from './baseString.js';

export class Url extends BaseString {
    public constructor(value: string) {
        super(value);
    }

    public validate(value: unknown): boolean {
        return z.url().safeParse(value).success;
    }
}
