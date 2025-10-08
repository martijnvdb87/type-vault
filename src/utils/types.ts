type Unpack<T> = {
    [K in keyof T]: T[K] extends object ? Unpack<T[K]> : T[K];
};

type LetterLowerCase =
    | 'a'
    | 'b'
    | 'c'
    | 'd'
    | 'e'
    | 'f'
    | 'g'
    | 'h'
    | 'i'
    | 'j'
    | 'k'
    | 'l'
    | 'm'
    | 'n'
    | 'o'
    | 'p'
    | 'q'
    | 'r'
    | 's'
    | 't'
    | 'u'
    | 'v'
    | 'w'
    | 'x'
    | 'y'
    | 'z';

type LetterUpperCase =
    | 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F'
    | 'G'
    | 'H'
    | 'I'
    | 'J'
    | 'K'
    | 'L'
    | 'M'
    | 'N'
    | 'O'
    | 'P'
    | 'Q'
    | 'R'
    | 'S'
    | 'T'
    | 'U'
    | 'V'
    | 'W'
    | 'X'
    | 'Y'
    | 'Z';

type Letter = Unpack<LetterLowerCase | LetterUpperCase>;

type Tld = Unpack<`${Letter}${string}`>;

type Domain = Unpack<`${string}.${Tld}`>;

export type EmailValue = Unpack<`${string}@${Domain}`>;

export type DateOnlyValue = Unpack<`${number}-${number}-${number}`>;

export type TimeOnlyValue = Unpack<
    `${number}:${number}:${number}.${number}` | `${number}:${number}:${number}`
>;

export type DateTimeValue = Unpack<`${DateOnlyValue}T${TimeOnlyValue}Z`>;

export type MonthValue =
    | 'january'
    | 'february'
    | 'march'
    | 'april'
    | 'may'
    | 'june'
    | 'july'
    | 'august'
    | 'september'
    | 'october'
    | 'november'
    | 'december';

export type WeekdayValue =
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday';

export type DurationValue =
    Unpack<`P${`${number}Y` | ''}${`${number}M` | ''}${`${number}D` | ''}${`T${`${number}H` | ''}${`${number}M` | ''}${`${number}S` | ''}` | ''}`>;

export type UuidValue = `${string}-${string}-${string}-${string}-${string}`;

export type ColorHexValue = `#${string}`;

export type ColorRgbValue =
    | `rgb${'a' | ''}(${number},${number},${number}${`,${number}` | ''})`
    | `rgb${'a' | ''}(${number} ${number} ${number}${`/${number}` | ''})`;

export type ColorHslValue =
    `hsl${'a' | ''}(${number}${'deg' | ''}${',' | ' '}${number}${'%' | ''}${',' | ' '}${number}${'%' | ''}${`${`${' ' | ''}/${' ' | ''}` | ','}${number}${'%' | ''}` | ''})`;

export type ColorOklchValue =
    `oklch${'a' | ''}(${number}${'%' | ''} ${number}${'%' | ''} ${number}${'deg' | ''}${`${' ' | ''}/${' ' | ''}${number}${'%' | ''}` | ''})`;

export type PhoneNumberValue = `+${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}${number}`;
