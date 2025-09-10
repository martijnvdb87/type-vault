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

    protected modifier(value: unknown): ColorHexString {
        const shortNotation = String(value).match(/^#([0-9a-fA-F]{3})$/);

        if (shortNotation) {
            const parts = [
                shortNotation[1][0],
                shortNotation[1][0],
                shortNotation[1][1],
                shortNotation[1][1],
                shortNotation[1][2],
                shortNotation[1][2],
                'ff',
            ].join('');

            return `#${parts.toLowerCase()}`;
        }

        const regularNotation = String(value).match(/^#([0-9a-fA-F]{6})$/);

        if (regularNotation) {
            return `#${regularNotation[1].toLowerCase()}ff`;
        }

        const fullNotation = String(value).match(/^#([0-9a-fA-F]{8})$/);

        if (fullNotation) {
            return `#${fullNotation[1].toLowerCase()}`;
        }

        return value as ColorHexString;
    }

    public static nullable(value: ColorHexString | null = null) {
        return new ColorHex(value, { nullable: true });
    }

    public static immutable(value: ColorHexString) {
        return new ColorHex(value, { immutable: true });
    }
}
