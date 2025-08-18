import { BaseNumber } from './baseNumber.js';

export class Integer extends BaseNumber {
    protected modifier(value: number): number {
        return Math.floor(value);
    }
}
