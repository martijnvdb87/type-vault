import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class Url<TOptions extends TypeOption = TypeOption> extends BaseString<TOptions> {
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

    public static nullable(value: string | null = null) {
        return new Url(value, { nullable: true });
    }

    public static immutable(value: string) {
        return new Url(value, { immutable: true });
    }
}
