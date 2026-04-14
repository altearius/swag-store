import { cacheLife } from 'next/cache';
import type { ProductListCategory } from '../api.types';
import createClient from '../createClient';
import type { operations } from '../openapi.d.yaml';
import transformQuery from './lib/transformQuery';
import transformResult from './lib/transformResult';

type Query = NonNullable<operations['listProducts']['parameters']['query']>;

export interface Options {
	readonly category?: ProductListCategory | undefined;
	readonly featured?: boolean;
	readonly limit?: number | undefined;
	readonly page?: number | undefined;
	readonly search?: string | undefined;
}

export default async function listProducts(o: Options) {
	return fetchProducts(transformQuery(o));
}

async function fetchProducts(query: Query) {
	'use cache';
	cacheLife('hours'); // sure, why not?

	const client = createClient();

	const result = await client.GET('/products', {
		params: { query },
	});

	return transformResult(result.data);
}
