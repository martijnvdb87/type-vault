import { WeekdayValue } from '@/utils/types.js';
import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

const weekdays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
] as const;

export class Weekday<TOptions extends TypeOption = TypeOption> extends BaseString<
    TOptions,
    WeekdayValue | Capitalize<WeekdayValue>
> {
    public static Monday = new Weekday(weekdays[0]);
    public static Tuesday = new Weekday(weekdays[1]);
    public static Wednesday = new Weekday(weekdays[2]);
    public static Thursday = new Weekday(weekdays[3]);
    public static Friday = new Weekday(weekdays[4]);
    public static Saturday = new Weekday(weekdays[5]);
    public static Sunday = new Weekday(weekdays[6]);

    protected modifier(value: unknown) {
        if (value instanceof Weekday) {
            value = value.value;
        }

        return value as WeekdayValue;
    }

    protected validate(value: string): boolean {
        if (!super.validate(value)) {
            return false;
        }

        return weekdays.some((weekday) => {
            return weekday === value.toLowerCase();
        });
    }

    public static nullable(value: WeekdayValue | null = null) {
        return new Weekday(value, { nullable: true });
    }

    public static immutable(value: WeekdayValue) {
        return new Weekday(value, { immutable: true });
    }
}
