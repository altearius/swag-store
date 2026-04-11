import { cacheLife } from 'next/cache';
import createClient from '../createClient';
import transformProduct from './lib/transformProduct';

export default async function getProductDetail(slug: string) {
	'use cache';
	cacheLife('hours');

	const client = createClient();

	const result = await client.GET(`/products/{id}`, {
		params: { path: { id: slug } },
	});

	const raw = result.data?.data;

	if (!raw) {
		return null;
	}

	return transformProduct(raw);
}
