import type { ProductListCategory } from '#api/api.types';
import listProducts from '#api/products/listProducts';

export default async function search(
	category: ProductListCategory | undefined,
	term: string | undefined,
) {
	const results = await listProducts({ category, limit: 5, search: term });
	return results?.data ?? [];
}
