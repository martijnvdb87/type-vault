import { MonthValue } from '@/utils/types.js';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
] as const;

export class Month<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    MonthValue | Capitalize<MonthValue>
> {
    public static January = new Month(months[0]);
    public static February = new Month(months[1]);
    public static March = new Month(months[2]);
    public static April = new Month(months[3]);
    public static May = new Month(months[4]);
    public static June = new Month(months[5]);
    public static July = new Month(months[6]);
    public static August = new Month(months[7]);
    public static September = new Month(months[8]);
    public static October = new Month(months[9]);
    public static November = new Month(months[10]);
    public static December = new Month(months[11]);

    protected modifier(value: unknown) {
        if (value instanceof Month) {
            value = value.value;
        }

        return value as MonthValue;
    }

    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        return months.some((month) => {
            return month === value.toLowerCase();
        });
    }

    public static nullable(value: MonthValue | null = null) {
        return new Month(value, { nullable: true });
    }

    public static immutable(value: MonthValue) {
        return new Month(value, { immutable: true });
    }
}
