export type Brand<TInstance, TBrand> = TInstance & { __brand: TBrand };

export type Constructor = new (...args: unknown[]) => object;

type Unpack<T> = {
    [K in keyof T]: T[K] extends object ? Unpack<T[K]> : T[K];
};

export type LetterLowerCase =
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

export type LetterUpperCase =
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

export type Letter = Unpack<LetterLowerCase | LetterUpperCase>;

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type Alphanumeric = Unpack<Letter | Digit>;

export type Tld = Unpack<`${Letter}${string}`>;

export type Domain = Unpack<`${string}.${Tld}`>;

export type Email = Unpack<`${string}@${Domain}`>;

export type Year = number;
export type Month = number;
export type Date = number;
export type Hour = number;
export type Minute = number;
export type Second = number;
export type Millisecond = number;

export type DateOnlyString = Unpack<`${Year}-${Month}-${Date}`>;

export type TimeOnlyString = Unpack<
    `${Hour}:${Minute}:${Second}.${Millisecond}` | `${Hour}:${Minute}:${Second}`
>;

export type DateTimeString = Unpack<`${DateOnlyString}T${TimeOnlyString}Z`>;

export type MonthString =
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

export type UuidString = `${string}-${string}-${string}-${string}-${string}`;
