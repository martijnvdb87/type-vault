import { TypeVaultValidationError } from '@/errors/typeVaultValidationError.js';
import dayjs from 'dayjs';
import { Type } from './type.js';

export class DateTime extends Type<string> {
    public constructor(value: DateTime | string | Date | undefined = undefined) {
        if (value instanceof Date) {
            value = dayjs(value).toISOString();
        }

        if (value instanceof DateTime) {
            value = value.value;
        }

        super(value);
    }

    protected default(): string {
        return dayjs().toISOString();
    }

    protected validate(value: unknown): boolean {
        if (!(typeof value === 'string' || value instanceof String)) {
            return false;
        }

        return true;
    }

    protected modifier(value: unknown): string {
        if (value instanceof Date) {
            value = dayjs(value).toISOString();
        }

        if (value instanceof DateTime) {
            value = value.value;
        }

        if (!(typeof value === 'string' || value instanceof String)) {
            throw new TypeVaultValidationError();
        }

        return String(value);
    }

    public static now(): DateTime {
        return new DateTime(dayjs().toISOString());
    }
}
