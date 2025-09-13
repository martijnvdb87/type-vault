import { clamp } from '@/utils/numberUtils.js';
import { ColorRgbString } from '@/utils/types.js';
import { Color } from './color.js';
import { SetTypeValue, TypeOption } from './type.js';

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

        return /^rgba\((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}), (25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}), (25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}), (1|0(?:.\d+)?)?\)$/.test(
            String(value)
        );
    }

    protected modifier(value: unknown): ColorRgbString {
        const matches = String(value).match(
            /^rgba?\((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})(?:, ?| )(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})(?:, ?| )(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})(?:(?:, ?| ?\/ ?)(1|0?(?:.\d+)?)?)?\)$/
        );

        if (matches) {
            value = numberToRgbString({
                red: parseInt(matches[1]),
                green: parseInt(matches[2]),
                blue: parseInt(matches[3]),
                alpha: matches[4] ? parseFloat(matches[4]) : 1,
            });
        }

        return value as ColorRgbString;
    }

    public get red() {
        return rgbToNumberValues(this.value).red;
    }

    public set red(red: number) {
        this.assertMutable();

        this.value = numberToRgbString({ ...rgbToNumberValues(this.value), red });
    }

    public get green() {
        return rgbToNumberValues(this.value).green;
    }

    public set green(green: number) {
        this.assertMutable();

        this.value = numberToRgbString({ ...rgbToNumberValues(this.value), green });
    }

    public get blue() {
        return rgbToNumberValues(this.value).blue;
    }

    public set blue(blue: number) {
        this.assertMutable();

        this.value = numberToRgbString({ ...rgbToNumberValues(this.value), blue });
    }

    public get alpha() {
        return rgbToNumberValues(this.value).alpha;
    }

    public set alpha(alpha: number) {
        this.assertMutable();

        this.value = numberToRgbString({ ...rgbToNumberValues(this.value), alpha });
    }

    public static nullable(value: ColorRgbString | null = null) {
        return new ColorRgb(value, { nullable: true });
    }

    public static immutable(value: ColorRgbString) {
        return new ColorRgb(value, { immutable: true });
    }
}

function numberToRgbString<TOptions extends TypeOption = TypeOption>(options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
}) {
    const { red, green, blue, alpha } = options;

    const parts = [
        clamp(red, 0, 255),
        clamp(green, 0, 255),
        clamp(blue, 0, 255),
        clamp(alpha, 0, 1),
    ];

    return `rgba(${parts.join(', ')})` as SetTypeValue<TOptions, ColorRgbString>;
}

function rgbToNumberValues(value: ColorRgbString | null) {
    const matches = String(value ?? '').match(
        /^rgba\((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}), (25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}), (25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}), (1|0(?:.\d+)?)?\)$/
    );

    if (matches === null) {
        return {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 0,
        };
    }

    return {
        red: parseInt(matches[1]),
        green: parseInt(matches[2]),
        blue: parseInt(matches[3]),
        alpha: matches[4] ? parseFloat(matches[4]) : 1,
    };
}
