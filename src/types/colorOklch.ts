import { assertClamp } from '@/utils/numberUtils.js';
import { ColorOklchString } from '@/utils/types.js';
import { Color } from './color.js';
import { SetTypeValue, TypeOption } from './type.js';

export class ColorOklch<TOptions extends TypeOption = TypeOption> extends Color<
    TOptions,
    ColorOklchString
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

    protected modifier(value: unknown): ColorOklchString {
        const match = matchAbsoluteFormat(String(value));

        if (match) {
            return valuesToHslString(match);
        }

        return value as ColorOklchString;
    }

    public static nullable(value: ColorOklchString | null = null) {
        return new ColorOklch(value, { nullable: true });
    }

    public static immutable(value: ColorOklchString) {
        return new ColorOklch(value, { immutable: true });
    }
}

function matchAbsoluteFormat(value: string) {
    const pattern =
        /^oklch\(((?:\d+?)|(?:(?:\d+?)?\.\d+?))(%)? ((?:\d+?)|(?:(?:\d+?)?\.\d+?))(%)? ((?:\d+?)|(?:(?:\d+?)?\.\d+?))(?:deg)?(?: ?\/ ?((?:\d+?)?(?:\.\d+?)?)(%)?)?\)$/;

    const matches = value.match(pattern);

    if (!matches) {
        return null;
    }

    const lightness = assertClamp(
        (() => {
            const float = parseFloat(matches[1]);

            if (matches[2] === '%') {
                return float;
            }

            return float * 100;
        })(),
        {
            min: 0,
            max: 100,
        }
    );

    const chroma = assertClamp(
        (() => {
            const float = parseFloat(matches[3]);

            if (matches[4] === '%') {
                return (float / 100) * 0.4;
            }

            return float;
        })(),
        {
            min: 0,
            max: 0.5,
        }
    );

    const hue = assertClamp(parseFloat(matches[5]), {
        min: 0,
        max: 360,
    });

    const alpha = assertClamp(
        (() => {
            if (matches[6] === undefined) {
                return 100;
            }

            const float = parseFloat(matches[6]);

            if (matches[7] === '%') {
                return float;
            }

            return float * 100;
        })(),
        {
            min: 0,
            max: 100,
        }
    );

    return {
        lightness,
        chroma,
        hue,
        alpha,
    };
}

function valuesToHslString<TOptions extends TypeOption = TypeOption>(options: {
    lightness: number;
    chroma: number;
    hue: number;
    alpha: number;
}) {
    const { lightness, chroma, hue, alpha } = options;

    return `oklch(${lightness}% ${chroma} ${hue}deg / ${alpha}%)` as SetTypeValue<
        TOptions,
        ColorOklchString
    >;
}
