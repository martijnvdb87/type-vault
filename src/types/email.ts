import { EmailValue as EmailPattern } from '@/utils/types.js';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class Email<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    EmailPattern
> {
    protected validate(value: unknown): boolean {
        if (!super.validate(value)) {
            return false;
        }

        try {
            const emailParts = (value as string).split('@');

            if (emailParts.length !== 2) {
                return false;
            }

            const url = new URL(`http://${emailParts[1]}`);

            const urlParts = url.host.split('.');

            if (urlParts.length < 2) {
                return false;
            }

            if (urlParts.some((part) => part === '')) {
                return false;
            }

            const emailUsernameRegex =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*$/;

            if (!emailUsernameRegex.test(emailParts[0])) {
                return false;
            }

            return true;
        } catch {
            return false;
        }
    }

    public static nullable(value: EmailPattern | null = null) {
        return new Email(value, { nullable: true });
    }

    public static immutable(value: EmailPattern) {
        return new Email(value, { immutable: true });
    }
}
