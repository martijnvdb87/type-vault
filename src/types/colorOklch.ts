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

        return Boolean(getMatchFromString(String(value)));
    }

    protected modifier(value: unknown): ColorOklchString {
        const match = matchAbsoluteFormat(String(value));

        if (match) {
            return valuesToString(match);
        }

        return value as ColorOklchString;
    }

    public get lightness() {
        return matchValueFormat(this.value).lightness;
    }

    public set lightness(lightness: number) {
        this.assertMutable();

        this.value = valuesToString({ ...matchValueFormat(this.value), lightness });
    }

    public get chroma() {
        return matchValueFormat(this.value).chroma;
    }

    public set chroma(chroma: number) {
        this.assertMutable();

        this.value = valuesToString({ ...matchValueFormat(this.value), chroma });
    }

    public get hue() {
        return matchValueFormat(this.value).hue;
    }

    public set hue(hue: number) {
        this.assertMutable();

        this.value = valuesToString({ ...matchValueFormat(this.value), hue });
    }

    public get alpha() {
        return matchValueFormat(this.value).alpha;
    }

    public set alpha(alpha: number) {
        this.assertMutable();

        this.value = valuesToString({ ...matchValueFormat(this.value), alpha });
    }

    public static nullable(value: ColorOklchString | null = null) {
        return new ColorOklch(value, { nullable: true });
    }

    public static immutable(value: ColorOklchString) {
        return new ColorOklch(value, { immutable: true });
    }
}

function getMatchFromString(value: string) {
    const pattern =
        /^oklch\(((?:\d+?)|(?:(?:\d+?)?\.\d+?))(%)? ((?:\d+?)|(?:(?:\d+?)?\.\d+?))(%)? ((?:\d+?)|(?:(?:\d+?)?\.\d+?))(?:deg)?(?: ?\/ ?((?:\d+?)?(?:\.\d+?)?)(%)?)?\)$/;

    return value.match(pattern);
}

function matchValueFormat(value: string | null) {
    const match = matchAbsoluteFormat(value ?? '');

    if (match === null || value === null) {
        return {
            lightness: 0,
            chroma: 0,
            hue: 0,
            alpha: 0,
        };
    }

    return match;
}

function matchAbsoluteFormat(value: string) {
    const matches = getMatchFromString(value);

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
            max: 1,
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

function valuesToString<TOptions extends TypeOption = TypeOption>(options: {
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
