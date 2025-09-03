import { Email as EmailPattern } from '@/utils/types.js';
import * as z from 'zod/mini';
import { BaseString } from './baseString.js';

export class Email extends BaseString<EmailPattern> {
    protected validate(value: unknown): boolean {
        return z.email().safeParse(value).success;
    }
}
