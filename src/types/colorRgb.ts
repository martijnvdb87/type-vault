import { assertClamp } from '@/utils/numberUtils.js';
import { ColorRgbString } from '@/utils/types.js';
import { default as ColorJs } from 'colorjs.io';
import { Color } from './color.js';
import { SetTypeValue, TypeOption } from './type.js';

const regex = {
    getValue:
        /^rgb\((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}(?:\.\d*)?) (25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}(?:\.\d*)?) (25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}(?:\.\d*)?)(?: \/ (100|(?:\d{1,2})(?:\.\d+)?)%)?\)$/,
    setValue:
        /^rgba?\((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}(?:\.\d*)?)(?:, ?| )(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}(?:\.\d*)?)(?:, ?| )(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2}(?:\.\d*)?)(?:(?:, ?| ?\/ ?)((?:(?:100|(?:\d{1,2})(?:\.\d+)?)%)|(?:1|(?:0(?:\.\d+)?))))?\)$/,
} as const;

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

        return regex.getValue.test(String(value));
    }

    protected modifier(value: unknown): ColorRgbString {
        const matches = String(value).match(regex.setValue);

        if (matches) {
            const alpha = (() => {
                if (!matches[4]) {
                    return 100;
                }

                const alphaPercentageMatches = matches[4].match(/^((?:\d*)(?:\.\d*)?)%$/);

                if (alphaPercentageMatches) {
                    return parseFloat(alphaPercentageMatches[1]);
                }

                return parseFloat(matches[4]) * 100;
            })();

            value = numberToRgbString({
                red: parseFloat(matches[1]),
                green: parseFloat(matches[2]),
                blue: parseFloat(matches[3]),
                alpha,
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

    public static from(color: Color) {
        const colorJs = new ColorJs(color.value);

        const value = numberToRgbString({
            red: colorJs.srgb.r * 255,
            green: colorJs.srgb.g * 255,
            blue: colorJs.srgb.b * 255,
            alpha: color.getNormalizedAlpha(),
        });

        return new ColorRgb(value, {
            immutable: color.isImmutable(),
            nullable: color.isNullable(),
        });
    }
}

function numberToRgbString<TOptions extends TypeOption = TypeOption>(options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
}) {
    const { red, green, blue, alpha } = options;

    const parts = {
        red: assertClamp(red, { min: 0, max: 255 }),
        green: assertClamp(green, { min: 0, max: 255 }),
        blue: assertClamp(blue, { min: 0, max: 255 }),
        alpha: assertClamp(alpha, { min: 0, max: 100 }),
    };

    return `rgb(${parts.red} ${parts.green} ${parts.blue} / ${parts.alpha}%)` as SetTypeValue<
        TOptions,
        ColorRgbString
    >;
}

function rgbToNumberValues(value: ColorRgbString | null) {
    const matches = String(value ?? '').match(regex.getValue);

    if (matches === null) {
        return {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 0,
        };
    }

    return {
        red: parseFloat(matches[1]),
        green: parseFloat(matches[2]),
        blue: parseFloat(matches[3]),
        alpha: parseFloat(matches[4]),
    };
}
