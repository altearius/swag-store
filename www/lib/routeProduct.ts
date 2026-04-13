import type { Product } from '#api/api.types';

export default function routeProduct(product: Product | null | undefined) {
	const slugOrProductId = product?.slug ?? product?.id;

	if (!slugOrProductId) {
		return null;
	}

	const encodedId = encodeURIComponent(slugOrProductId);
	return `/products/${encodedId}` as const;
}
