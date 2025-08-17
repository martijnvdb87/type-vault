import { Type } from './type.js';

export class Integer extends Type<number> {
    protected default(): number {
        return 0;
    }

    protected validate(value: unknown): boolean {
        return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value);
    }

    protected modifier(value: number): number {
        return Math.floor(value);
    }
}
