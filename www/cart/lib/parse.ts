import type { Cart } from '#api/api.types';
import isRecord from '#lib/isRecord';

export default function parse(raw: string): Cart {
	const json = JSON.parse(raw);

	if (!isRecord(json)) {
		throw new Error('Invalid cart data');
	}

	const { items, createdAt, updatedAt, ...rest } = json;

	if (!Array.isArray(items)) {
		throw new Error('Invalid cart items');
	}

	if (typeof updatedAt !== 'string') {
		throw new Error('Invalid cart updatedAt');
	}

	return {
		...rest,

		...(typeof createdAt === 'string'
			? { createdAt: new Date(createdAt) }
			: {}),

		updatedAt: new Date(updatedAt),
		items: items.map(transformItem),
	};
}

function transformItem(item: unknown, idx: number) {
	if (!isRecord(item)) {
		throw new Error(`Invalid cart item at index ${idx}`);
	}

	const { addedAt, product: rawProduct, ...rest } = item;

	const product = transformProduct(rawProduct, idx);

	if (rawProduct && !product) {
		throw new Error(`Invalid product in cart item at index ${idx}`);
	}

	return {
		...rest,
		...(typeof addedAt === 'string' ? { addedAt: new Date(addedAt) } : {}),
		...(product ? { product } : {}),
	};
}

function transformProduct(product: unknown, idx: number) {
	if (!isRecord(product)) {
		return;
	}

	const { createdAt, currency, tags, ...rest } = product;

	if (typeof currency !== 'string') {
		throw new Error(`Invalid product currency at index ${idx}`);
	}

	return {
		...rest,

		...(typeof createdAt === 'string'
			? { createdAt: new Date(createdAt) }
			: {}),

		...(Array.isArray(tags) ? { tags: new Set(tags) } : {}),

		currency,
	} as const;
}
