export const DateTimeUnit = {
    Year: 'year',
    Month: 'month',
    Quarter: 'quarter',
    Week: 'week',
    Day: 'day',
    Hour: 'hour',
    Minute: 'minute',
    Second: 'second',
    Millisecond: 'millisecond',
};

export type DateTimeUnit = (typeof DateTimeUnit)[keyof typeof DateTimeUnit];
