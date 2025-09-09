import { ColorRgbString } from '@/utils/types.js';
import { Color } from './color.js';
import { TypeOption } from './type.js';

export class ColorRgb<TOptions extends TypeOption = TypeOption> extends Color<
    TOptions,
    ColorRgbString
> {
    protected validate(value: unknown): boolean {
        if (!super.validate(value)) {
            return false;
        }

        if (typeof value !== 'string' && !(value instanceof String)) {
            return false;
        }

        return /^rgba?\((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})(, ?| )(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})(, ?| )(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})((, ?| \/ )(1|0?(.\d+)?))?\)$/.test(
            String(value)
        );
    }

    public static nullable(value: ColorRgbString | null = null) {
        return new ColorRgb(value, { nullable: true });
    }

    public static immutable(value: ColorRgbString) {
        return new ColorRgb(value, { immutable: true });
    }
}
