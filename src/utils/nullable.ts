import { Type } from '@/types/type.js';

type Constructor = new (...args: unknown[]) => object;

type Nullable<TInstance extends Type<unknown>> = {
    value: TInstance['value'] | null;
};

export function Nullable<TValue, TInstance extends Type<TValue>>(instance: TInstance) {
    return new (class Nullable extends (instance.constructor as Constructor) {
        protected _value: TValue | null | undefined = instance.rawValue;

        protected default() {
            return null;
        }
    })() as unknown as Omit<TInstance, 'value'> & Nullable<TInstance>;
}
