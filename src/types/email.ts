import { Email as EmailPattern } from '@/utils/types.js';
import * as z from 'zod/mini';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class Email<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    EmailPattern
> {
    protected validate(value: unknown): boolean {
        return z.email().safeParse(value).success;
    }
}
