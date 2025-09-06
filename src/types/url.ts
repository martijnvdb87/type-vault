import * as z from 'zod/mini';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class Url<TOptions extends TypeOption = TypeOption> extends BaseString<TOptions> {
    protected validate(value: unknown): boolean {
        return z.url().safeParse(value).success;
    }

    public static nullable(value: string | null = null) {
        return new Url(value, { nullable: true });
    }

    public static immutable(value: string) {
        return new Url(value, { immutable: true });
    }
}
