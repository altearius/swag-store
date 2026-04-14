import type { Readable } from 'openapi-typescript-helpers';
import type { components } from '../openapi-types';

type Product = components['schemas']['Product'];

export default function transformProduct(item: Readable<Product>) {
	const {
		createdAt: rawCreatedAt,
		currency,
		images: rawImages,
		tags: rawTags,
		...rest
	} = item;

	const createdAt = rawCreatedAt ? new Date(rawCreatedAt) : null;

	const images: readonly string[] | null = rawImages
		? Array.from(rawImages)
		: null;

	const tags: ReadonlySet<string> | null = rawTags
		? new Set(Array.from(rawTags))
		: null;

	return {
		...rest,
		...(createdAt ? { createdAt } : {}),
		...(images ? { images } : {}),
		...(tags ? { tags } : {}),
		// API documentation says all prices are in USD, but products still contain
		// an optional currency code. I'm assuming this is meant to support other
		// currencies, but USD is the default.
		currency: currency ?? 'USD',
	} as const;
}
