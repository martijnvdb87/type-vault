import { PhoneNumberString } from '@/utils/types.js';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class PhoneNumber<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    PhoneNumberString
> {
    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        return isValidFormat(value);
    }

    public static nullable(value: PhoneNumberString | null = null) {
        return new PhoneNumber(value, { nullable: true });
    }

    public static immutable(value: PhoneNumberString) {
        return new PhoneNumber(value, { immutable: true });
    }
}

function isValidFormat(value: string) {
    return Boolean(matchPattern(value));
}

function matchPattern(value: string) {
    return value.match(/^\+[1-9]\d{1,14}$/);
}
