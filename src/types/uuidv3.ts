import { UuidString } from '@/utils/types.js';
import { v3, version } from 'uuid';
import { TypeOption } from './type.js';
import { Uuid } from './uuid.js';

export class Uuidv3<TOptions extends TypeOption = TypeOption> extends Uuid<TOptions> {
    protected validate(value: unknown): boolean {
        return super.validate(value) && version(String(value)) === 3;
    }

    public static random(value: string, namespace: Uuid) {
        return new Uuidv3(v3(value, namespace.value) as UuidString);
    }

    public static nullable(value: UuidString | null = null) {
        return new Uuidv3(value, { nullable: true });
    }

    public static immutable(value: UuidString) {
        return new Uuidv3(value, { immutable: true });
    }
}
