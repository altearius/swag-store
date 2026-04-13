'use server';

import { cacheLife } from 'next/cache';
import createClient from '../createClient';

export default async function getStock(slug: string) {
	'use cache';
	cacheLife('seconds');

	const client = createClient();

	const result = await client.GET(`/products/{id}/stock`, {
		params: { path: { id: slug } },
	});

	return result.data?.data ?? null;
}
