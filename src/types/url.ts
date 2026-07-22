import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class Url<TOptions extends TypeOption = TypeOption> extends BaseString<string, TOptions> {
    protected validate(value: unknown): boolean {
        if (!super.validate(value)) {
            return false;
        }

        try {
            const url = new URL(value as string);

            const urlParts = url.host.split('.');

            if (urlParts.length < 2) {
                return false;
            }

            if (urlParts.some((part) => part === '')) {
                return false;
            }

            return ['http:', 'https:'].includes(url.protocol);
        } catch {
            return false;
        }
    }
}
