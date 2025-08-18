import { Type } from './type.js';

export class BaseString extends Type<string> {
    protected default(): string {
        return '';
    }

    protected validate(value: unknown): boolean {
        if (!(typeof value === 'string' || value instanceof String)) {
            return false;
        }

        return true;
    }

    protected modifier(value: string): string {
        return value;
    }
}
