import { Type } from '@/types/type.js';

type Constructor = new (...args: unknown[]) => object;

export type Nullable<TInstance extends { value: unknown }> = {
    value: TInstance['value'] | null;
    get rawValue(): TInstance['value'] | undefined;
} & Omit<TInstance, 'value'>;

export function Nullable<TInstance extends Type<TInstance['value']>>(instance: TInstance) {
    return new (class Nullable extends (instance.constructor as Constructor) {
        protected _value: TInstance['value'] | null | undefined = instance.rawValue;

        protected default() {
            return null;
        }
    })() as unknown as Nullable<TInstance>;
}
