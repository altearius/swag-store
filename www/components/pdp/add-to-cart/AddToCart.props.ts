import type { Product, Stock } from '#api/api.types';

export interface Props {
	readonly product: Product;
	readonly stock: Promise<Stock | null>;
}
