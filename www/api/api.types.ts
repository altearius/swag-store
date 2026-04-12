import type transformProduct from './lib/transformProduct';
import type getStock from './stock/getStock';

export type Product = ReturnType<typeof transformProduct>;
export type Stock = NonNullable<Awaited<ReturnType<typeof getStock>>>;
