import * as z from 'zod/mini';
import { NullableBaseString } from './nullableBaseString.js';

export class NullableEmailAddress extends NullableBaseString {
    protected validate(value: unknown): boolean {
        return z.nullable(z.email()).safeParse(value).success;
    }
}
