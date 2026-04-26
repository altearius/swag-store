import type { Product } from '#api/api.types';
import listProducts from '#api/products/listProducts';
import getBaseUrl from '#lib/getBaseUrl';
import type { MetadataRoute } from 'next';
import { cacheLife } from 'next/cache';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	'use cache';
	cacheLife('hours');

	const baseUrl = getBaseUrl();
	const products = await getProducts();

	// /cart is intentionally omitted
	return [
		{
			url: baseUrl.toString(),
			changeFrequency: 'hourly',
			priority: 1,
		},
		{
			url: new URL('/search', baseUrl).toString(),
			changeFrequency: 'hourly',
			priority: 0.8,
		},
		...Array.from(products).map(([slug, product]) =>
			transformProduct(baseUrl, slug, product),
		),
	];
}

function transformProduct(
	baseUrl: URL,
	slug: string,
	product: Product,
): MetadataRoute.Sitemap[number] {
	const images = product.images ? [...product.images] : null;

	return {
		url: new URL(`/products/${slug}`, baseUrl).toString(),
		changeFrequency: 'hourly',
		priority: 0.75,
		...(images ? { images } : {}),
	};
}

async function getProducts(): Promise<ReadonlyMap<string, Product>> {
	const products = new Map<string, Product>();
	let page: number | null = 1;

	do {
		const results = await listProducts({ limit: 100, page });
		let size = products.size;

		for (const product of results?.data ?? []) {
			const { slug } = product;
			if (slug) {
				products.set(slug, product);
			}
		}

		page =
			products.size > size && results?.meta?.pagination?.hasNextPage
				? page + 1
				: null;
	} while (page);

	return products;
}
