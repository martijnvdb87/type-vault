import { PhoneNumberValue } from '@/utils/types.js';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class PhoneNumber<TOptions extends TypeOption = TypeOption> extends BaseString<
    PhoneNumberValue,
    TOptions
> {
    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        return isValidFormat(value);
    }
}

function isValidFormat(value: string) {
    return Boolean(matchPattern(value));
}

function matchPattern(value: string) {
    return value.match(/^\+[1-9]\d{1,14}$/);
}
