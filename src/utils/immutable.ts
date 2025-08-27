import { Type } from '@/types/type.js';
import { Nullable } from './nullable.js';
import { Brand, Constructor } from './types.js';

export type Immutable<TInstance> = {
    set value(_value: never);
} & Brand<TInstance, 'immutable'>;

export function Immutable<TInstance extends Type<TInstance['value']> | Nullable<TInstance>>(
    instance: TInstance
) {
    return new (class Immutable extends (instance.constructor as Constructor) {
        public constructor() {
            super(instance.rawValue);
            Object.freeze(this);
        }
    })() as unknown as Immutable<TInstance>;
}
