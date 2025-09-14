import { ColorHslString } from '@/utils/types.js';
import { Color } from './color.js';
import { TypeOption } from './type.js';

export class ColorHsl<TOptions extends TypeOption = TypeOption> extends Color<
    TOptions,
    ColorHslString
> {
    protected validate(value: unknown): boolean {
        if (!super.validate(value)) {
            return false;
        }

        if (typeof value !== 'string' && !(value instanceof String)) {
            return false;
        }

        // return /^hsla?()$/.test(
        //     String(value)
        // );

        return true;
    }

    protected modifier(value: unknown): ColorHslString {
        return value as ColorHslString;
    }

    public static nullable(value: ColorHslString | null = null) {
        return new ColorHsl(value, { nullable: true });
    }

    public static immutable(value: ColorHslString) {
        return new ColorHsl(value, { immutable: true });
    }
}
