export type Brand<TInstance, TBrand> = TInstance & { __brand: TBrand };

export type Constructor = new (...args: unknown[]) => object;
