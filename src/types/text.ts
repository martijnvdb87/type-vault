import { BaseString } from './baseString.js';
import { TypeOption } from './type.js';

export class Text<TOptions extends TypeOption = TypeOption> extends BaseString<TOptions> {
    public static nullable(value: string | null = null) {
        return new Text(value, { nullable: true });
    }

    public static immutable(value: string) {
        return new Text(value, { immutable: true });
    }
}
