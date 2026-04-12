import type { Cart } from '#api/api.types';

export default function serialize(cart: Cart): string {
	const { items, ...rest } = cart;

	return JSON.stringify({
		...rest,
		...(items ? { items: items.map(transformItem) } : {}),
	});
}

function transformItem(item: Cart['items'][number]) {
	const { product, ...rest } = item;

	return {
		...rest,
		...(product ? { product: transformProduct(product) } : {}),
	};
}

function transformProduct(product: Cart['items'][number]['product']) {
	if (!product) {
		return;
	}

	const { tags, ...rest } = product;

	return {
		...rest,
		...(tags ? { tags: Array.from(tags) } : {}),
	};
}
