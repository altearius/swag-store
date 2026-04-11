import type { Product } from '#api/products/listProducts';

export interface Props {
	readonly products: readonly Product[];
}
