import { assertClamp } from '@/utils/numberUtils.js';
import { ColorHslValue } from '@/utils/types.js';
import { Color } from './color.js';
import { SetTypeValue, TypeOption } from './type.js';

export class ColorHsl<TOptions extends TypeOption = TypeOption> extends Color<
    TOptions,
    ColorHslValue
> {
    protected validate(value: unknown): boolean {
        if (!super.validate(value)) {
            return false;
        }

        if (typeof value !== 'string' && !(value instanceof String)) {
            return false;
        }

        return Boolean(matchAbsoluteFormat(String(value)));
    }

    protected modifier(value: unknown): ColorHslValue {
        {
            const match = matchAbsoluteFormat(String(value));

            if (match) {
                return valuesToHslString(match);
            }
        }

        {
            const match = matchLegacyFormat(String(value));

            if (match) {
                return valuesToHslString(match);
            }
        }

        {
            const match = matchHslaLegacyFormat(String(value));

            if (match) {
                return valuesToHslString(match);
            }
        }

        return value as ColorHslValue;
    }

    public get hue() {
        return matchValueFormat(this.value).hue;
    }

    public set hue(hue: number) {
        this.assertMutable();

        this.value = valuesToHslString({ ...matchValueFormat(this.value), hue });
    }

    public get saturation() {
        return matchValueFormat(this.value).saturation;
    }

    public set saturation(saturation: number) {
        this.assertMutable();

        this.value = valuesToHslString({ ...matchValueFormat(this.value), saturation });
    }

    public get lightness() {
        return matchValueFormat(this.value).lightness;
    }

    public set lightness(lightness: number) {
        this.assertMutable();

        this.value = valuesToHslString({ ...matchValueFormat(this.value), lightness });
    }

    public get alpha() {
        return matchValueFormat(this.value).alpha;
    }

    public set alpha(alpha: number) {
        this.assertMutable();

        this.value = valuesToHslString({ ...matchValueFormat(this.value), alpha });
    }

    public static nullable(value: ColorHslValue | null = null) {
        return new ColorHsl(value, { nullable: true });
    }

    public static immutable(value: ColorHslValue) {
        return new ColorHsl(value, { immutable: true });
    }
}

function matchValueFormat(value: string | null) {
    const match = matchAbsoluteFormat(value ?? '');

    if (match === null || value === null) {
        return {
            hue: 0,
            saturation: 0,
            lightness: 0,
            alpha: 0,
        };
    }

    return match;
}

function matchAbsoluteFormat(value: string) {
    const pattern =
        /^hsl\((\d+?(?:\.\d+?)?)(?:deg)? (\d+?(?:\.\d+?)?)%? (\d+?(?:\.\d+?)?)%?(?: ?\/ ?(\d+?(?:\.\d+?)?)%?)?\)$/;

    const matches = value.match(pattern);

    if (!matches) {
        return null;
    }

    return normalizeColorValues({
        hue: matches[1],
        saturation: matches[2],
        lightness: matches[3],
        alpha: matches[4],
    });
}

function matchLegacyFormat(value: string) {
    const pattern =
        /^hsla?\((\d+?(?:\.\d+?)?)(?:deg)?, ?(\d+?(?:\.\d+?)?)%?, ?(\d+?(?:\.\d+?)?)%?(?:, ?(\d+?(?:\.\d+?)?))?\)$/;

    const matches = value.match(pattern);

    if (!matches) {
        return null;
    }

    const alpha = matches[4] === undefined ? 100 : parseFloat(matches[4]) * 100;

    return normalizeColorValues({
        hue: matches[1],
        saturation: matches[2],
        lightness: matches[3],
        alpha,
    });
}

function matchHslaLegacyFormat(value: string) {
    const pattern =
        /^hsla\((\d+?(?:\.\d+?)?)(?:deg)? (\d+?(?:\.\d+?)?)%? (\d+?(?:\.\d+?)?)%?(?: ?\/ ?(\d+?(?:\.\d+?)?)%?)?\)$/;

    const matches = value.match(pattern);

    if (!matches) {
        return null;
    }

    return normalizeColorValues({
        hue: matches[1],
        saturation: matches[2],
        lightness: matches[3],
        alpha: matches[4],
    });
}

function normalizeColorValues(options: {
    hue: string | number;
    saturation: string | number;
    lightness: string | number;
    alpha: string | number | undefined;
}) {
    const { hue, saturation, lightness, alpha = 100 } = options;

    const values = {
        hue: typeof hue === 'number' ? hue : parseFloat(hue),
        saturation: typeof saturation === 'number' ? saturation : parseFloat(saturation),
        lightness: typeof lightness === 'number' ? lightness : parseFloat(lightness),
        alpha: typeof alpha === 'number' ? alpha : parseFloat(alpha),
    };

    return {
        hue: assertClamp(values.hue, { min: 0, max: 360 }),
        saturation: assertClamp(values.saturation, { min: 0, max: 100 }),
        lightness: assertClamp(values.lightness, { min: 0, max: 100 }),
        alpha: alpha === undefined ? 100 : assertClamp(values.alpha, { min: 0, max: 100 }),
    };
}

function valuesToHslString<TOptions extends TypeOption = TypeOption>(options: {
    hue: number;
    saturation: number;
    lightness: number;
    alpha: number;
}) {
    const { hue, saturation, lightness, alpha } = options;

    return `hsl(${hue}deg ${saturation}% ${lightness}% / ${alpha}%)` as SetTypeValue<
        TOptions,
        ColorHslValue
    >;
}
