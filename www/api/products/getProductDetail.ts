import { cacheLife } from 'next/cache';
import createClient from '../createClient';
import transformProduct from '../lib/transformProduct';

export default async function getProductDetail(slug: string) {
	'use cache';
	cacheLife('hours');

	const client = createClient();

	// For testing purposes, the magic slug "does-not-exist" triggers a
	// Prefer=code=404 header to be added. In local development, this will
	// cause the Prism mock server to return a 404 response, but has no
	// effect in production.
	const headers =
		slug === 'does-not-exist' ? { Prefer: 'code=404' } : undefined;

	const result = await client.GET(`/products/{id}`, {
		params: { path: { id: slug } },
		...(headers ? { headers } : {}),
	});

	const raw = result.data?.data;

	if (!raw) {
		return null;
	}

	return transformProduct(raw);
}
