import { assertClamp } from '@/utils/numberUtils.js';
import { ColorHexString } from '@/utils/types.js';
import { Color } from './color.js';
import { SetTypeValue, TypeOption } from './type.js';

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

        return /^#[0-9a-fA-F]{8}$/.test(String(value));
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

        const regularNotation = String(value).match(/^#([0-9a-fA-F]{6,8})$/);

        if (regularNotation) {
            return `#${regularNotation[1].toLowerCase()}`.padEnd(9, 'f') as ColorHexString;
        }

        return value as ColorHexString;
    }

    public get red() {
        return hexToNumberValues(this.value).red;
    }

    public set red(red: number) {
        this.assertMutable();

        this.value = numberToHexString({ ...hexToNumberValues(this.value), red });
    }

    public get green() {
        return hexToNumberValues(this.value).green;
    }

    public set green(green: number) {
        this.assertMutable();

        this.value = numberToHexString({ ...hexToNumberValues(this.value), green });
    }

    public get blue() {
        return hexToNumberValues(this.value).blue;
    }

    public set blue(blue: number) {
        this.assertMutable();

        this.value = numberToHexString({ ...hexToNumberValues(this.value), blue });
    }

    public get alpha() {
        return hexToNumberValues(this.value).alpha;
    }

    public set alpha(alpha: number) {
        this.assertMutable();

        this.value = numberToHexString({ ...hexToNumberValues(this.value), alpha });
    }

    public getNormalizedAlpha() {
        return this.alpha / 2.55;
    }

    public static nullable(value: ColorHexString | null = null) {
        return new ColorHex(value, { nullable: true });
    }

    public static immutable(value: ColorHexString) {
        return new ColorHex(value, { immutable: true });
    }
}

function numberToHex(number: number) {
    number = number ?? 0;

    return (number % 256).toString(16).padStart(2, '0');
}

function hexToNumber(hex: string) {
    hex = hex ?? '00';

    return parseInt(hex, 16) % 256;
}

function numberToHexString<TOptions extends TypeOption = TypeOption>(options: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
}) {
    const { red, green, blue, alpha } = options;

    const parts = [
        numberToHex(assertClamp(red, { min: 0, max: 255 })),
        numberToHex(assertClamp(green, { min: 0, max: 255 })),
        numberToHex(assertClamp(blue, { min: 0, max: 255 })),
        numberToHex(assertClamp(alpha, { min: 0, max: 255 })),
    ];

    return `#${parts.join('')}` as SetTypeValue<TOptions, ColorHexString>;
}

function hexToNumberValues(value: ColorHexString | null) {
    if (value === null) {
        return {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 0,
        };
    }

    return {
        red: hexToNumber(value.slice(1, 3)),
        green: hexToNumber(value.slice(3, 5)),
        blue: hexToNumber(value.slice(5, 7)),
        alpha: hexToNumber(value.slice(7, 9)),
    };
}
