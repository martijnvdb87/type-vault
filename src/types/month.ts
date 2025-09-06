import { MonthString } from '@/utils/types.js';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class Month<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    MonthString | Capitalize<MonthString>
> {
    public static January = new Month('january');
    public static February = new Month('february');
    public static March = new Month('march');
    public static April = new Month('april');
    public static May = new Month('may');
    public static June = new Month('june');
    public static July = new Month('july');
    public static August = new Month('august');
    public static September = new Month('september');
    public static October = new Month('october');
    public static November = new Month('november');
    public static December = new Month('december');

    protected modifier(value: unknown) {
        if (value instanceof Month) {
            value = value.value;
        }

        return value as MonthString;
    }

    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        return [
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
        ].some((month) => {
            return month === value.toLowerCase();
        });
    }

    public static nullable(value: MonthString | null = null) {
        return new Month(value, { nullable: true });
    }

    public static immutable(value: MonthString) {
        return new Month(value, { immutable: true });
    }
}
