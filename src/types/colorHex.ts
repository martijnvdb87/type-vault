import { ColorHexString } from '@/utils/types.js';
import { Color } from './color.js';
import { TypeOption } from './type.js';

export class ColorHex<TOptions extends TypeOption = TypeOption> extends Color<
    TOptions,
    ColorHexString
> {
    protected validate(value: unknown): boolean {
        if (!super.validate(value)) {
            return false;
        }

        if (typeof value !== 'string' && !(value instanceof String)) {
            return false;
        }

        return /^#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?(?:[0-9a-fA-F]{2})?$/.test(String(value));
    }

    public static nullable(value: ColorHexString | null = null) {
        return new ColorHex(value, { nullable: true });
    }

    public static immutable(value: ColorHexString) {
        return new ColorHex(value, { immutable: true });
    }
}
