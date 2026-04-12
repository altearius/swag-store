import type { Readable } from 'openapi-typescript-helpers';
import transformProduct from '../../lib/transformProduct';
import type { components } from '../../openapi.yaml';

type CartResponse = components['schemas']['CartResponse'];
type Item = components['schemas']['CartItemWithProduct'];

export default function transformCart(
	response: Readable<CartResponse> | undefined,
) {
	const data = response?.data;

	if (!data) {
		return null;
	}

	const { items: rawItems, createdAt, updatedAt, ...rest } = data;

	return {
		...rest,
		...(createdAt ? { createdAt: new Date(createdAt) } : {}),
		...(updatedAt ? { updatedAt: new Date(updatedAt) } : {}),
		items: Array.from(rawItems ?? []).map(transformItem),
	};
}

function transformItem(item: Readable<Item>) {
	const { addedAt, product, ...rest } = item;

	return {
		...rest,
		...(addedAt ? { addedAt: new Date(addedAt) } : {}),
		...(product ? { product: transformProduct(product) } : {}),
	};
}
